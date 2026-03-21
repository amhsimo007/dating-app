const express = require('express');
const { auth } = require('../middleware/auth');
const Match = require('../models/Match');
const User = require('../models/User');
const router = express.Router();

// Get all matches for current user
router.get('/', auth, async (req, res) => {
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
      },
      {
        path: 'lastMessage',
        select: 'content createdAt sender read'
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
        lastMessage: match.lastMessage,
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

// Unmatch with a user
router.delete('/:matchId', auth, async (req, res) => {
  try {
    const { matchId } = req.params;
    const currentUser = req.user;

    const match = await Match.findOne({
      _id: matchId,
      $or: [{ user1: currentUser._id }, { user2: currentUser._id }],
      status: 'matched'
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    match.status = 'unmatched';
    await match.save();

    // Update user stats
    await User.findByIdAndUpdate(currentUser._id, {
      $inc: { 'stats.matches': -1 }
    });

    const otherUserId = match.getOtherUser(currentUser._id);
    await User.findByIdAndUpdate(otherUserId, {
      $inc: { 'stats.matches': -1 }
    });

    res.json({
      success: true,
      message: 'Unmatched successfully'
    });
  } catch (error) {
    console.error('Unmatch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error unmatching'
    });
  }
});

// Get match details
router.get('/:matchId', auth, async (req, res) => {
  try {
    const { matchId } = req.params;
    const currentUser = req.user;

    const match = await Match.findOne({
      _id: matchId,
      $or: [{ user1: currentUser._id }, { user2: currentUser._id }],
      status: 'matched'
    })
    .populate([
      { path: 'user1', select: '-password -verification.verificationToken -reports' },
      { path: 'user2', select: '-password -verification.verificationToken -reports' }
    ]);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found'
      });
    }

    res.json({
      success: true,
      match
    });
  } catch (error) {
    console.error('Get match error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching match'
    });
  }
});

module.exports = router;
