import express from 'express';
import authMiddelware from '../middlware/authMiddlware.js';
import {
  addResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
} from '../controllers/resourceController.js';

const router = express.Router();

router.get('/', authMiddelware, getResources);
router.post('/add-resource', authMiddelware, addResource);
router.get('/:id', authMiddelware, getResource);
router.put('/:id', authMiddelware, updateResource);
router.delete('/:id', authMiddelware, deleteResource);

export default router;
