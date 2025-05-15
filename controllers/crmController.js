import Crm from '../models/Crm.js';
import User from '../models/User.js';

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { userId, comment } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const newComment = new Crm({ userId, userName: user.username, comment });
    await newComment.save();

    res.status(201).json({ message: 'Comment submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Secure: Only get comments that belong to the requesting user
export const getUserComments = async (req, res) => {
  const { userId } = req.params;
  try {
    const comments = await Crm.find({ userId }).sort({ submittedAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments.' });
  }
};

//update a comment
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { userId, comment } = req.body;

  try {
    const crm = await Crm.findById(id);

    if (!crm) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    // Ensure only the owner can update
    if (crm.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized action.' });
    }

    crm.comment = comment;
    await crm.save();
    res.json({ message: 'Comment updated successfully.' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const crm = await Crm.findById(id);

    if (!crm) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    // Ensure only the owner can delete
    if (crm.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized action.' });
    }

    await Crm.findByIdAndDelete(id);
    res.json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
