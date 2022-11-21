require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const url = 'mongodb://chacha:chacha1998@localhost:27017/venus';
const PORT = process.env.PORT || '9000';

const app = express();

mongoose.connect(url);

const con = mongoose.connection;

con.on('open', () => {
    console.log('connected....');
})

app.use(express.json());
app.use(authenticateUser);

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        req.user = null;
        next();
    } else {
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                req.user = null;
                console.log('Wrong Access token');
                next();
            } else {
                req.user = user;
                console.log(user);
                next();
            }
        })
    }
}

app.listen(PORT, () => {
    console.log('Listeing to', PORT);
})