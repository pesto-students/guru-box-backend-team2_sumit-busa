require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const url = 'mongodb://chacha:chacha1998@localhost:27017/venus';
const PORT = process.env.PORT || '9000';
const app = express();

const SECRET = "RAJ";
const REFRESH_SECRET = "REFRESH_SECRET";

mongoose.connect(url);
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected....');
})

app.use(express.json());

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
let refreshTokens = [];

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(400);

    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(401);

    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
        if(err) return res.sendStatus(401);
        console.log(user);
        const accessToken = jwt.sign({email: user.email}, SECRET, {expiresIn: "50sec"});
        res.json({accessToken: accessToken});
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
})  

app.post('/login', (req, res)=>{
    // Authenticate
    const email = req.body.email;
    const user = {
        email:email 
    }
    const accessToken = jwt.sign(user, SECRET, {expiresIn: "20sec"});
    const refreshToken = jwt.sign(user, REFRESH_SECRET);
    refreshTokens.push(refreshToken);
    res.json({accessToken: accessToken, refreshToken: refreshToken});
})

app.get('/test', authenticateToken, (req, res)=>{    
    const user = {
        email: req.user.email,
        msg : "hello ji"
    }
    res.json(user);

})

function authenticateToken(req, res, next) {
    const authHeader  = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        console.log('Here');
        console.log(user);
        req.user = user;
        next();
    })
}

app.listen(PORT, () => {
    console.log('Listeing to', PORT);
})

