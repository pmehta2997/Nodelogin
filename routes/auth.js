const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();



router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post("/send2FACode", authController.send2FACode);
router.post("/verify2FACode", authController.verify2FACode);


module.exports = router;