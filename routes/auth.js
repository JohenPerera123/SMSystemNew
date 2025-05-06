import express from 'express'
import { login, verify } from '../controllers/authController.js';
import authMiddelware from '../middlware/authMiddlware.js'

const router = express.Router();

router.post('/login', login)
router.post('/verify', authMiddelware, verify)

export default router;