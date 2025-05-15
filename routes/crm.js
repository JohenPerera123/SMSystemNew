import express from 'express';
import {
  createComment,
  getUserComments,
  updateComment,
  deleteComment,
} from '../controllers/crmController.js';

const router = express.Router();

router.post('/add', createComment);
router.get('/user/:userId', getUserComments);
router.put('/update/:id', updateComment);
router.delete('/delete/:id', deleteComment);

export default router;
