const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Message = require('../models/Message');
const Match = require('../models/Match');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get messages for a match
router.get('/:matchId', auth, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
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

    const { matchId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const currentUser = req.user;

    // Verify user is part of the match
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

    const messages = await Message.find({
      match: matchId,
      deleted: false
    })
    .populate('sender', 'profile.firstName profile.photos')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    // Mark messages as read
    const unreadMessages = messages.filter(msg => 
      !msg.read && 
      msg.sender._id.toString() !== currentUser._id.toString()
    );

    if (unreadMessages.length > 0) {
      await Promise.all(unreadMessages.map(msg => msg.markAsRead()));
      
      // Update unread count in match
      const userField = match.user1.toString() === currentUser._id.toString() 
        ? 'unreadCount.user1' 
        : 'unreadCount.user2';
      
      await Match.findByIdAndUpdate(matchId, {
        $set: { [userField]: 0 }
      });
    }

    res.json({
      success: true,
      messages: messages.reverse(), // Reverse to show oldest first
      currentPage: page,
      totalPages: Math.ceil(await Message.countDocuments({ match: matchId, deleted: false }) / limit)
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching messages'
    });
  }
});

// Send a message
router.post('/:matchId', auth, [
  body('content').notEmpty().isLength({ max: 1000 }).trim().escape(),
  body('type').optional().isIn(['text', 'image', 'gif', 'voice'])
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

    const { matchId } = req.params;
    const { content, type = 'text', mediaUrl } = req.body;
    const currentUser = req.user;

    // Verify user is part of the match
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

    // Create message
    const message = new Message({
      match: matchId,
      sender: currentUser._id,
      content,
      type,
      mediaUrl
    });

    await message.save();

    // Update match's last message
    match.lastMessage = message._id;
    
    // Increment unread count for recipient
    const recipientField = match.user1.toString() === currentUser._id.toString() 
      ? 'unreadCount.user2' 
      : 'unreadCount.user1';
    
    match[recipientField.split('.')[0]][recipientField.split('.')[1]]++;
    
    await match.save();

    // Populate sender info for response
    await message.populate('sender', 'profile.firstName profile.photos');

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error sending message'
    });
  }
});

// Edit a message
router.put('/:messageId', auth, [
  body('content').notEmpty().isLength({ max: 1000 }).trim().escape()
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

    const { messageId } = req.params;
    const { content } = req.body;
    const currentUser = req.user;

    const message = await Message.findById(messageId).populate('match');
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Verify user is the sender
    if (message.sender.toString() !== currentUser._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Can only edit your own messages'
      });
    }

    // Check if message is too old to edit (24 hours)
    const hoursSinceCreation = (Date.now() - message.createdAt) / (1000 * 60 * 60);
    if (hoursSinceCreation > 24) {
      return res.status(400).json({
        success: false,
        message: 'Can only edit messages within 24 hours'
      });
    }

    await message.editMessage(content);

    res.json({
      success: true,
      message: 'Message updated successfully',
      data: message
    });
  } catch (error) {
    console.error('Edit message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error editing message'
    });
  }
});

// Delete a message
router.delete('/:messageId', auth, async (req, res) => {
  try {
    const { messageId } = req.params;
    const currentUser = req.user;

    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Verify user is the sender
    if (message.sender.toString() !== currentUser._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Can only delete your own messages'
      });
    }

    await message.softDelete();

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting message'
    });
  }
});

// Report a message
router.post('/:messageId/report', auth, [
  body('reason').isIn(['inappropriate', 'spam', 'harassment', 'other']),
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

    const { messageId } = req.params;
    const { reason, description } = req.body;
    const currentUser = req.user;

    const message = await Message.findById(messageId).populate('match');
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Verify user is part of the match
    const match = message.match;
    if (![match.user1.toString(), match.user2.toString()].includes(currentUser._id.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to report this message'
      });
    }

    message.reported = true;
    message.reportReason = reason;
    await message.save();

    res.json({
      success: true,
      message: 'Message reported successfully'
    });
  } catch (error) {
    console.error('Report message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error reporting message'
    });
  }
});

module.exports = router;
