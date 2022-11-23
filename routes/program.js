const express = require('express');
const router = express.Router();

const programContoller = require('../controllers/program');
const { signInRequired, onlyMentor, onlyUser } = require('../permissions/permission');

router.post('/', signInRequired, onlyMentor, programContoller.createProgram);
router.get('/:mentorId', signInRequired, programContoller.getProgramsByMentor);
router.delete('/:programId', signInRequired, onlyMentor, programContoller.deleteProgramById);
router.put('/:programId', signInRequired, onlyMentor, programContoller.updateProgramById);

module.exports = router;