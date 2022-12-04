const MENTOR = "mentor";
const USER = "user";

function signInRequired(req, res, next) {
    if (req.user == null) {
        res.sendStatus(401);
    } else {
        next();
    }
}

function onlyMentor(req, res, next) {
    const role = req.user.role;
    if (role === MENTOR) {
        next();
    } else {
        res.sendStatus(403);
    }
}

function onlyUser(req, res, next) {
    const role = req.user.role;
    if (role === USER) {
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    signInRequired,
    onlyMentor,
    onlyUser
}