const Comment = require('../models/comment')
const Blog = require("../models/blog");

async function commentHandler(req, res) {
    let blog = await Blog.findOne({_id: req.params.ID}).populate('createBy');
    await Comment.create({
        content: req.body.comment,
        blogId: req.params.ID,
        createdBy: req.user._id,
    })
    return res.redirect(`/view/blog/${req.params.ID}`);
}

module.exports = {commentHandler}