const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const userController = require('../controllers/user.js');

router.post('/login', async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        await User.insertMany([req.body]);
        res.json(req.body);
    } catch (error) {
        console.log(error);
        res.send('Error ' + error);
    }
})

router.post('/signup', async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        await User.insertMany([req.body]);
        res.json(req.body);
    } catch (error) {
        console.log(error);
        res.send('Error ' + error);
    }
})

router.post('/', userController.saveUserDetails);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
module.exports = router;