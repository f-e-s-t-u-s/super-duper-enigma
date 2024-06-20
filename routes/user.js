import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// register user 
router.post('/register', userController.handleRegisterUser)

// login user
router.post('/login', userController.handleUserLogin)

export default router;