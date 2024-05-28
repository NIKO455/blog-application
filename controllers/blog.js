const Blog = require('../models/blog')

async function createBlogHandler(req, res) {
    return res.render('pages/blog/create', { user: req.user })
}

async function storeBlogHandler(req, res) {
    const { coverImageURL, title, description } = req.body
    if (!title || !description) {
        return res.render('pages/blog/create', { error: "Some fields are missing", user: req.user })
    }

    await Blog.create({
        coverImageURL: req.file.filename,
        title,
        body: description
    })

    return res.redirect('/blog/create-blog')

}

module.exports = { createBlogHandler, storeBlogHandler }