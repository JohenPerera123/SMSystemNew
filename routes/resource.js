import express from 'express';
import authMiddelware from '../middlware/authMiddlware.js';
import upload from '../middlware/upload.js';
import {
  addResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
} from '../controllers/resourceController.js';

const router = express.Router();

router.get('/', authMiddelware, getResources);
router.post('/add-resource', authMiddelware,upload.single('photo'), addResource);
router.get('/:id', authMiddelware, getResource);
router.put('/:id', authMiddelware, upload.single('photo'),updateResource);
router.delete('/:id', authMiddelware, deleteResource);

export default router;