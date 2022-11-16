const mongoose = require('mongoose');

const PersonalDetailSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String
});

const SocialMediaSchema = new mongoose.Schema({
    type: String,
    url: String
})

const EducationalDetailSchema = new mongoose.Schema({
    title: String,
    description: String,
    markingSystem: String,
    markes: String
})

const JobRole = new mongoose.Schema({
    title: String,
    description: String,
    startTime: String,
    stillWorking: Boolean,
    endTime: String
})

const WorkExperienceSchema = new mongoose.Schema({
    organisation: String,
    stillWorking: Boolean,
    startTime: String,
    endTime: String,
    roles: [JobRole]
})

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    mobileNumber: String,
    personalDetails: [PersonalDetailSchema],
    aboutMe: String,
    webSiteLink: String,
    socialMedia: [SocialMediaSchema],
    educationalDetails: [EducationalDetailSchema]
})

module.exports = mongoose.model('User', UserSchema);