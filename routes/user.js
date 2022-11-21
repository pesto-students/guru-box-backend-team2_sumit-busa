const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');

router.post('/', userController.saveUserDetails);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);

module.exports = router;