const { ObjectId } = require('mongodb');
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
    Program.find({ mentorId: mentorId }).then((programs) => {
        res.send(programs);
    }).catch((err) => {
        res.status(500).send(err);
    })
}

function deleteProgramById(req, res) {
    const programId = req.params.programId;
    Program.deleteOne({ _id: new ObjectId(programId), mentorId: req.user._id }).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        res.status(500).send(err);
    })
}

function updateProgramById(req, res) {
    const programId = req.params.programId;
    const body = req.body;
    if (!body) {
        res.sendStatus(400);
        return;
    }
    Program.findOne({ _id: new ObjectId(programId), mentorId: req.user._id})
        .then((program) => {
            program.title = body.title;
            program.description = body.description;
            program.crossPrice = body.crossPrice
            program.price = body.price;
            program.currency = body.currency;
            program.save();
        }).then(() => {
            res.send('Success');
        }).catch((err) => {
            res.status(500).send(err);
        })
}

module.exports = {
    createProgram,
    getProgramsByMentor,
    deleteProgramById,
    updateProgramById
}