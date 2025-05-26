import express from 'express'
import { login, verify, register, sendOtp, verifyOtp, resetPassword } from '../controllers/authController.js';
import authMiddelware from '../middlware/authMiddlware.js'

const router = express.Router();

router.post('/login', login)
router.get('/verify', authMiddelware, verify)
router.post('/register', register)
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;