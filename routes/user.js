const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');
const { signInRequired, onlyMentor, onlyUser } = require('../permissions/permission');

router.put('/', signInRequired, onlyMentor, userController.updateUserData);
router.get('/', signInRequired, userController.getUserDetail);
router.get('/industries', userController.getIndustries);

// router.post('/', userController.saveUserDetails);
// router.get('/', signInRequired, userController.getAllUser);
// router.get('/:id', userController.getUserById);

module.exports = router;