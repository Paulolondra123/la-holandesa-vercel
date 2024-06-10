const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/login', AuthController.login);
router.get('/verify-auth', AuthController.verifyAuth);

module.exports = router;
