import express from 'express';
import {
  createComment,
  getUserComments,
  getAllComments,
  updateComment,
  deleteComment,
} from '../controllers/crmController.js';

const router = express.Router();

router.post('/add', createComment);
router.get('/user/:userId', getUserComments);
router.get('/all', getAllComments);
router.put('/update/:id', updateComment);
router.delete('/delete/:id', deleteComment);

export default router;
