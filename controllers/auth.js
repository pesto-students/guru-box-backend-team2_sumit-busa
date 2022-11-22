const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const User = require('../models/user.js');

const DEFAULT_ROLE = "user";
const MENTOR_ROLE = "mentor";

function login(req, res) {
    if (!req.body) res.sendStatus(400);
    const { email, password } = req.body;
    if (email == null || password == null) {
        res.sendStatus(400);
        return;
    };
    User.findOne({ email: email }).select({ _id: 1, email: 1, password: 1, role: 1 }).then((user) => {
        if (!user) {
            res.status(401).send('Incorrect username or password');
            return;
        }
        if (user.password == password) {
            res.json(generatTokens(user));
            return;
        } else {
            res.status(401).send('Incorrect username or password');
        }
    })
}

function signup(req, res) {
    if (!req.body) { res.sendStatus(400); return; };
    const { email, password, firstName, middleName, lastName, role } = req.body;
    if (email == null || password == null || firstName == null || lastName == null || role == null) {
        res.sendStatus(400);
        return;
    };
    if (role !== DEFAULT_ROLE && role !== MENTOR_ROLE) {
        res.sendStatus(400);
        return;
    };
    User.exists({ email: email }).then((exists) => {
        if (exists) {
            res.status(200).json({ msg: "Email already registered" });
            return;
        };
        const user = new User({
            email: email,
            password: password,
            personalDetails: {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName
            },
            role: role
        });
        user.save().then((user) => {
            res.json(generatTokens(user));
            return;
        }).catch((error) => {
            res.status(500).send(error);
        })
    }).catch((error) => {
        res.status(500).send(error);
    })
}

function refresh(req, res) {
    if (!req.body) { res.sendStatus(400); return; };
    const { refreshToken } = req.body;
    if (refreshToken == null) {
        res.sendStatus(400);
        return;
    };

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        console.log(user);
        const accessToken = generatAccessToken(user);
        res.json({ accessToken: accessToken });
    })

    async function removeRefreshTokenFromUser(id, refreshToken) {
        console.log(id);
        console.log(refreshToken);
        await User.updateOne({ _id: new ObjectId(id) }, { $pull: { refreshTokens: refreshToken } });
    }
}

function logout(req, res) {
    if (!req.body) { res.sendStatus(400); return; };
    const { refreshToken } = req.body;
    if (refreshToken == null) {
        res.sendStatus(400);
        return;
    };

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        console.log(user);
        User.exists({ _id: new ObjectId(user._id), refreshTokens: refreshToken }).then((user) => {
            if (!user) {
                res.sendStatus(401);
                return false;
            } else {
                removeRefreshTokenFromUser(user._id + "", refreshToken);
                res.sendStatus(200);
                return true;
            }
        });
    });

}

function generatAccessToken(user) {
    return jwt.sign({ _id: user._id + "", email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE_TIME });
}

function generatRefreshToken(user) {
    return jwt.sign({ _id: user._id + "", email: user.email, role: user.role }, process.env.REFRESH_TOKEN_SECRET);
}

async function mapRefreshTokenToUser(id, refreshToken) {
    await User.updateOne({ _id: new ObjectId(id) }, { $push: { refreshTokens: refreshToken } });
}

function generatTokens(user) {
    const accessToken = generatAccessToken(user);
    const refreshToken = generatRefreshToken(user);
    mapRefreshTokenToUser(user._id + "", refreshToken);
    return {
        "accessToken": accessToken,
        "refreshToken": refreshToken
    };
}

async function removeRefreshTokenFromUser(id, refreshToken) {
    await User.updateOne({ _id: new ObjectId(id) }, { $pull: { refreshTokens: refreshToken } });
}

module.exports = { login, signup, refresh, logout };