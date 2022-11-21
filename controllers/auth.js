const { exists } = require('../models/user.js');
const User = require('../models/user.js');

const DEFAULT_ROLE = "user";

function login(req, res) {
    if (!req.body) res.sendStatus(400);
    const { email, password } = req.body;
    if (email == null || password == null) {
        res.sendStatus(400);
        return;
    };
    if (email === "raj" && password === "1234") {
        res.json({
            "accessToken": "hihiihi",
            "refreshToken": "khikhikhi"
        })
    } else {
        res.status(401).send('Incorrect username or password');
    }
}

function signup(req, res) {
    if (!req.body) { res.sendStatus(400); return;};
    const { email, password, firstName, middleName, lastName } = req.body;
    if (email == null || password == null || firstName == null || lastName == null) {
        res.sendStatus(400);
        return;
    };

    User.exists({ email: email }).then((exists) => {
        console.log("In existss");
        console.log(exists);
        if (exists) res.status(200).json({ msg: "Email already registered" });
        const user = new User({
            email: email,
            password: password,
            personalDetails: {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName
                
            },
            role: DEFAULT_ROLE
        });
        user.save().then((user) => {
            res.sentStatus(200);
        }).catch((error) => {
            res.status(500).send(error);
        })
    }).catch((error) => {
        res.status(500).send(error);
    })

}

function test() {
    console.log("Here my friend");
    User.exists({ email: "raj2" }).then((exists) => {
        console.log(exists);
    })
}

// test();

module.exports = { login, signup };