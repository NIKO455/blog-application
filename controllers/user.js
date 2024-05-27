const bcrypt = require('bcrypt')
const User = require('../models/user')
const { createTokenForUser } = require("../services/authentication");

async function userLoginIndexHandler(req, res) {
    return res.render('pages/login')
}

async function userLoginStoreHandler(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('pages/login', { error: "User doesn't exist!" });
        }

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const token = createTokenForUser(user)
            res.cookie('token', token)
            return res.redirect('/');
        }

        return res.render('pages/login', { error: "Email or password is incorrect!" });
    } catch (error) {
        console.log(error);
        return res.render('pages/login', { error: "Some error has occurred!" });
    }
}

async function userRegisterIndexHandler(req, res) {
    return res.render('pages/register')
}


async function userRegisterStoreHandler(req, res) {
    const { fullName, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) return res.render('pages/register', { error: "User with this email already exist" })

    let createUser = await User.create({
        fullName, email, password
    })

    if (createUser) {
        let token = createTokenForUser(createUser)
        res.cookie('token', token)
    }

    return res.redirect('/')
}

function userLogoutHandler(req, res) {
    res.clearCookie('token')
    return res.redirect('/')
}

module.exports = {
    userLogoutHandler,
    userLoginIndexHandler,
    userRegisterIndexHandler,
    userLoginStoreHandler,
    userRegisterStoreHandler
}
