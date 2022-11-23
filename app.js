require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const url = process.env.MONGO_URL;
const PORT = process.env.PORT;

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
const programRoutes = require('./routes/program');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/programs', programRoutes);

function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        req.user = null;
        next();
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                req.user = null;
                console.log('Wrong Access token');
                next();
            } else {
                req.user = user;
                next();
            }
        })
    }
}

app.listen(PORT, () => {
    console.log('Listeing to', PORT);
})