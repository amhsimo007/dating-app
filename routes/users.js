const express = require('express');
const { body, query, validationResult } = require('express-validator');
const User = require('../models/User');
const Match = require('../models/Match');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get potential matches (discovery)
router.get('/discover', auth, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('minAge').optional().isInt({ min: 18, max: 100 }),
  query('maxAge').optional().isInt({ min: 18, max: 100 }),
  query('maxDistance').optional().isInt({ min: 1, max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const currentUser = req.user;
    const userPreferences = currentUser.preferences;

    // Get users that current user has already interacted with
    const existingMatches = await Match.find({
      $or: [{ user1: currentUser._id }, { user2: currentUser._id }]
    }).select('user1 user2 status');

    const interactedUsers = new Set();
    existingMatches.forEach(match => {
      const otherUser = match.user1.toString() === currentUser._id.toString() 
        ? match.user2.toString() 
        : match.user1.toString();
      interactedUsers.add(otherUser);
    });

    // Build query for potential matches
    const query = {
      _id: { 
        $ne: currentUser._id,
        $nin: Array.from(interactedUsers)
      },
      isActive: true,
      'profile.gender': currentUser.profile.interestedIn === 'both' 
        ? { $in: ['male', 'female', 'other'] }
        : currentUser.profile.interestedIn,
      'profile.interestedIn': { 
        $in: [currentUser.profile.gender, 'both'] 
      },
      'profile.age': {
        $gte: parseInt(req.query.minAge) || userPreferences.ageRange.min,
        $lte: parseInt(req.query.maxAge) || userPreferences.ageRange.max
      }
    };

    // Add geospatial query for distance
    const maxDistance = parseInt(req.query.maxDistance) || userPreferences.maxDistance;
    query['profile.location'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: currentUser.profile.location.coordinates
        },
        $maxDistance: maxDistance * 1000 // Convert km to meters
      }
    };

    // Exclude incognito users
    if (!currentUser.privacy.incognito) {
      query['privacy.incognito'] = { $ne: true };
    }

    const potentialMatches = await User.find(query)
      .select('-password -verification.verificationToken -reports')
      .skip(skip)
      .limit(limit)
      .sort({ 'stats.likesReceived': -1, lastActive: -1 });

    // Calculate distances and format response
    const matchesWithDistance = potentialMatches.map(user => {
      const userObj = user.getPublicProfile();
      
      // Calculate distance (simplified)
      const distance = calculateDistance(
        currentUser.profile.location.coordinates,
        user.profile.location.coordinates
      );

      return {
        ...userObj,
        distance: Math.round(distance)
      };
    });

    res.json({
      success: true,
      matches: matchesWithDistance,
      currentPage: page,
      totalPages: Math.ceil(await User.countDocuments(query) / limit)
    });
  } catch (error) {
    console.error('Discover error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching potential matches'
    });
  }
});

// Like/Pass a user
router.post('/interact/:userId', auth, [
  body('action').isIn(['like', 'pass'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { userId } = req.params;
    const { action } = req.body;
    const currentUser = req.user;

    // Check if target user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if interaction already exists
    const existingMatch = await Match.findOne({
      $or: [
        { user1: currentUser._id, user2: userId },
        { user1: userId, user2: currentUser._id }
      ]
    });

    if (existingMatch) {
      return res.status(400).json({
        success: false,
        message: 'Already interacted with this user'
      });
    }

    if (action === 'like') {
      // Create or update match
      const match = await Match.findOneAndUpdate(
        {
          $or: [
            { user1: currentUser._id, user2: userId },
            { user1: userId, user2: currentUser._id }
          ]
        },
        {
          $addToSet: { likedBy: currentUser._id },
          $setOnInsert: {
            user1: currentUser._id,
            user2: userId
          }
        },
        { upsert: true, new: true }
      );

      // Check if it's a mutual like
      const otherUserLike = await Match.findOne({
        $or: [
          { user1: userId, user2: currentUser._id },
          { user1: currentUser._id, user2: userId }
        ],
        likedBy: userId
      });

      if (otherUserLike && match.likedBy.length === 2) {
        // It's a match!
        match.status = 'matched';
        match.matchedAt = new Date();
        await match.save();

        // Update user stats
        await Promise.all([
          User.findByIdAndUpdate(currentUser._id, {
            $inc: { 'stats.likesGiven': 1, 'stats.matches': 1 }
          }),
          User.findByIdAndUpdate(userId, {
            $inc: { 'stats.likesReceived': 1, 'stats.matches': 1 }
          })
        ]);

        return res.json({
          success: true,
          message: 'It\'s a match!',
          match: true,
          matchData: await Match.findById(match._id).populate([
            { path: 'user1', select: 'profile.firstName profile.photos' },
            { path: 'user2', select: 'profile.firstName profile.photos' }
          ])
        });
      } else {
        // Just a like
        await User.findByIdAndUpdate(currentUser._id, {
          $inc: { 'stats.likesGiven': 1 }
        });
        await User.findByIdAndUpdate(userId, {
          $inc: { 'stats.likesReceived': 1 }
        });
      }
    }

    // For pass action, create a rejected match record
    if (action === 'pass') {
      await Match.create({
        user1: currentUser._id,
        user2: userId,
        status: 'rejected'
      });
    }

    res.json({
      success: true,
      message: `${action === 'like' ? 'Like' : 'Pass'} recorded`,
      match: false
    });
  } catch (error) {
    console.error('Interact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing interaction'
    });
  }
});

// Get user's matches
router.get('/matches', auth, async (req, res) => {
  try {
    const currentUser = req.user;

    const matches = await Match.find({
      $or: [{ user1: currentUser._id }, { user2: currentUser._id }],
      status: 'matched'
    })
    .populate([
      { 
        path: 'user1', 
        select: 'profile.firstName profile.lastName profile.photos profile.age lastActive',
        match: { _id: { $ne: currentUser._id } }
      },
      { 
        path: 'user2', 
        select: 'profile.firstName profile.lastName profile.photos profile.age lastActive',
        match: { _id: { $ne: currentUser._id } }
      }
    ])
    .sort({ matchedAt: -1 });

    const formattedMatches = matches.map(match => {
      const otherUser = match.user1._id.toString() === currentUser._id.toString() 
        ? match.user2 
        : match.user1;

      return {
        matchId: match._id,
        user: otherUser,
        matchedAt: match.matchedAt,
        unreadCount: match.user1._id.toString() === currentUser._id.toString() 
          ? match.unreadCount.user1 
          : match.unreadCount.user2
      };
    });

    res.json({
      success: true,
      matches: formattedMatches
    });
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching matches'
    });
  }
});

// Report a user
router.post('/report/:userId', auth, [
  body('reason').isIn(['inappropriate', 'spam', 'fake', 'harassment', 'other']),
  body('description').optional().isLength({ max: 500 }).trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { userId } = req.params;
    const { reason, description } = req.body;
    const currentUser = req.user;

    // Check if target user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add report to target user
    await User.findByIdAndUpdate(userId, {
      $push: {
        reports: {
          reportedBy: currentUser._id,
          reason,
          description
        }
      }
    });

    res.json({
      success: true,
      message: 'User reported successfully'
    });
  } catch (error) {
    console.error('Report error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error reporting user'
    });
  }
});

// Helper function to calculate distance between two coordinates
function calculateDistance(coords1, coords2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (coords2[1] - coords1[1]) * Math.PI / 180;
  const dLon = (coords2[0] - coords1[0]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coords1[1] * Math.PI / 180) * Math.cos(coords2[1] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

module.exports = router;
