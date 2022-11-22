const User = require('../models/user.js');

function saveUserDetails(req, res) {
    if (!req.body) {
        res.status(400).send("Enter Body");
    }
    const body = req.body;
    const user = new User({
        email: body.email,
        mobileNumber: body.mobileNumberm,
        role: body.role,
        personalDetails: body.personalDetails,
        aboutMe: body.aboutMe,
        webSiteLink: body.webSiteLink,
        educationalDetails: body.educationalDetails,
        workExperiences: body.workExperiences
    });
    user.save().then((user) => {
        res.send(user);
    })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error while fetching Data" });
        });
};

function getAllUser(req, res) {
    User.find().select({ password: 0 }).then((users) => {
        res.send(users);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Error while fetching Data" });
    })
}

function getUserById(req, res) {
    User.findById(req.params.id).select({ password: 0 }).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Error while fetching Data" });
    })
}

function updateUserData(req, res) {
    if (req.user == null) {
        res.sendStatus(401);
        return;
    }
    const b = req.body;
    const userId = req.user._id;
    if(!b) {
        res.status(400).send("Request Body not found");
    }
    User.findById(userId).then((user) => {
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }).then((user) => {
        user.mobileNumber = b.mobileNumber;
        user.personalDetails = b.personalDetails;
        user.aboutMe = b.aboutMe;;
        user.webSiteLink = b.webSiteLink;
        user.socialMedia = b.socialMedia;
        user.educationalDetails = b.educationalDetails;
        user.workExperiences = b.workExperiences;
        user.save();
    }).then(()=>{
        res.send('Success');
    }).catch((err) => {
        res.status(500).send({ message: err.message || "Error while updating User" });
    })
}

module.exports = { saveUserDetails, getAllUser, getUserById, updateUserData }