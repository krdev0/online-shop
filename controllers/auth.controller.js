const User = require('../models/user.model');
const authUtil = require('../util/authentication');

function getSignup(req, res) {
    res.render('customer/auth/signup')
}

async function signup(req, res) {
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );

    await user.signup();

    res.redirect('/login');
}

function getLogin(req, res) {
    res.render('customer/auth/login');
}

async function login(req, res) {
    const user = new User(req.body.email, req.body.password);
    const existingUser = await user.getUserWithSameEmail();

    if (!existingUser) {
        res.redirect('/login');
        return;
    }

    const correctPassword = user.hasMatchingPassword(existingUser.password);

    if (!correctPassword) {
        res.redirect('/login');
        return;
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect('/');
    });

}

function logout(req, res) {
    authUtil.removeUserSession(req);
    res.redirect('/login');
}

module.exports = {
    signup: signup,
    getSignup: getSignup,
    login: login,
    getLogin: getLogin,
    logout: logout,
}