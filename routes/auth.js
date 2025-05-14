import express from 'express'
import { login, verify, register } from '../controllers/authController.js';
import authMiddelware from '../middlware/authMiddlware.js'

const router = express.Router();

router.post('/login', login)
router.get('/verify', authMiddelware, verify)
router.post('/register', register)

export default router;