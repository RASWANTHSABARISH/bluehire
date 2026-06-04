const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all conversations for the current user
// @route   GET /api/messages/conversations
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find all messages involving this user
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    }).sort({ createdAt: -1 });

    // Extract unique conversation partners and the latest message
    const conversationsMap = new Map();

    for (const msg of messages) {
      const partnerId = msg.senderId.toString() === userId ? msg.receiverId.toString() : msg.senderId.toString();
      
      if (!conversationsMap.has(partnerId)) {
        conversationsMap.set(partnerId, {
          partnerId,
          latestMessage: msg.content,
          createdAt: msg.createdAt,
          isSentByMe: msg.senderId.toString() === userId
        });
      }
    }

    // Populate partner details
    const conversations = [];
    for (const [partnerId, data] of conversationsMap.entries()) {
      const partner = await User.findById(partnerId).select('name role profileComplete isVerified rating');
      if (partner) {
        conversations.push({
          ...data,
          partner
        });
      }
    }

    res.status(200).json({ success: true, data: conversations });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get messages between current user and a target user
// @route   GET /api/messages/:targetUserId
exports.getMessages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { targetUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 }); // Oldest to newest for chat view

    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Send a message
// @route   POST /api/messages
exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ success: false, message: 'Receiver and content are required' });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      content
    });

    res.status(201).json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
