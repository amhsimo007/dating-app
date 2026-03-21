const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'matched', 'rejected', 'unmatched'],
    default: 'pending'
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  matchedAt: {
    type: Date,
    default: null
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  unreadCount: {
    user1: {
      type: Number,
      default: 0
    },
    user2: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Ensure unique matches between two users
matchSchema.index({ user1: 1, user2: 1 }, { unique: true });

// Add method to check if users are matched
matchSchema.methods.isMatched = function() {
  return this.status === 'matched';
};

// Add method to get other user in match
matchSchema.methods.getOtherUser = function(currentUserId) {
  return this.user1.toString() === currentUserId.toString() ? this.user2 : this.user1;
};

module.exports = mongoose.model('Match', matchSchema);
