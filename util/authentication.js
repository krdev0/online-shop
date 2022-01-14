const res = require("express/lib/response");

function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.save(action);
}

function removeUserSession(req) {
    req.session.uid = null;
}

module.exports = {
    createUserSession: createUserSession,
    removeUserSession: removeUserSession
}