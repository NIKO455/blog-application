const Blog = require('../models/blog')

async function indexHandler(req, res) {
    let blogs = await Blog.find({})
    res.render('pages/index', {user: req.user, blogs})
}

module.exports = {indexHandler}