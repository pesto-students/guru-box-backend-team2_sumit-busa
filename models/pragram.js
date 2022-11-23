const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    title : { type: String, required: true },
    description: { type: String, required: true },
    crossPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    mentorId: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Program', programSchema);