const Blog = require("../models/blog");
const Comment = require('../models/comment')

async function createBlogHandler(req, res) {
    return res.render("pages/blog/create", {user: req.user});
}

async function storeBlogHandler(req, res) {
    const {coverImageURL, title, description} = req.body;
    if (!title || !description) {
        return res.render("pages/blog/create", {
            error: "Some fields are missing",
        });
    }

    await Blog.create({
        coverImageURL: req.file?.filename,
        createBy: req.user._id,
        title,
        body: description
    });

    return res.redirect("/blog/create-blog");
}

async function viewBlogHandler(req, res) {
    let blog = await Blog.findOne({_id: req.params.ID}).populate('createBy');
    let comments = await Comment.find({blogId: req.params.ID}).populate('createdBy');
    return res.render("pages/blog/view", {blog, user: req.user, comments});
}

module.exports = {createBlogHandler, storeBlogHandler, viewBlogHandler};
