import express from 'express'
import { registerUser, loginUser, logout, authMe } from '../controllers/authController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
router.get('/authMe',protect,authMe);



export default router;