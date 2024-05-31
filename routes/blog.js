const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/storage/blog-posts/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
const { createBlogHandler, storeBlogHandler } = require("../controllers/blog");
const {commentHandler} = require("../controllers/comment");

router.get("/create-blog", createBlogHandler);

router.post("/create-blog", upload.single("coverImageURL"), storeBlogHandler);

router.post('/comment/:ID', commentHandler)

module.exports = router;