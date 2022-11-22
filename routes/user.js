const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');
const { signInRequired, onlyMentor, onlyUser } = require('../permissions/permission');

router.put('/', signInRequired, onlyMentor, userController.updateUserData);
router.get('/', signInRequired, userController.getUserDetail);
router.get('/industries', userController.getIndustries);
router.get('/mentors', userController.getGetMentorsByIndustry);
router.get('/:id', signInRequired, userController.getUserById);

module.exports = router;