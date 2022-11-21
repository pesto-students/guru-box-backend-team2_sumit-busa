const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');
const { signInRequired, onlyMentor, onlyUser } = require('../permissions/permission')

router.post('/', userController.saveUserDetails);
router.get('/', signInRequired, userController.getAllUser);
router.get('/:id', userController.getUserById);
router.put('/', signInRequired, onlyMentor, userController.updateUserData);

module.exports = router;