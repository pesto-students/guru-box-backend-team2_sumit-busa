const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async(req, res)=>{
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.send('Error ' + error);
    }
})

router.post('/', async(req, res)=>{
    try {
        console.log('Here');
        console.log(req.body);
        User.insertMany([req.body]);
        res.json(req.body);
    } catch (error) {
        res.send('Error ' + error);
    }
})

module.exports = router;