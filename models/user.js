const mongoose = require('mongoose');

const PersonalDetailSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    dateOfBirth: Date,
    _id: false
});

const SocialMediaSchema = new mongoose.Schema({
    type: String,
    url: String,
    _id: false
})

const EducationalDetailSchema = new mongoose.Schema({
    type: String,
    title: String,
    description: String,
    markingSystem: String,
    markes: String,
    _id: false
})

const JobRole = new mongoose.Schema({
    title: String,
    description: String,
    startTime: Date,
    stillWorking: Boolean,
    endTime: Date,
    _id: false
})

const WorkExperienceSchema = new mongoose.Schema({
    organisation: String,
    stillWorking: Boolean,
    startTime: Date,
    endTime: Date,
    roles: [JobRole],
    _id: false
})

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    refreshTokens: [String],
    mobileNumber: String,
    role: { type: String, required: true },
    personalDetails: PersonalDetailSchema,
    aboutMe: String,
    webSiteLink: String,
    socialMedia: [SocialMediaSchema],
    educationalDetails: [EducationalDetailSchema],
    workExperiences: [WorkExperienceSchema]

}, { versionKey: false })

module.exports = mongoose.model('User', UserSchema);