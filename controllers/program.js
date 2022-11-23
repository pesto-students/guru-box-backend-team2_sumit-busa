const Program = require('../models/pragram');

function createProgram(req, res) {
    if (!req.body) {
        res.status(400).send("Enter Body");
    }
    const body = req.body;
    const program = new Program({
        title: body.title,
        description: body.description,
        crossPrice: body.crossPrice,
        price: body.price,
        currency: body.currency,
        mentorId: req.user._id
    });
    program.save().then((pragram) => {
        res.send(program);
    }).catch((err) => {
        res.status(500).send(err);
    })
}

function getProgramsByMentor(req, res) {
    const mentorId = req.params.mentorId;
    Program.find({mentorId : mentorId}).then((programs) => {
        res.send(programs);
    }).catch((err) => {
        res.status(500).send(err);
    })
}

module.exports = {
    createProgram,
    getProgramsByMentor
}