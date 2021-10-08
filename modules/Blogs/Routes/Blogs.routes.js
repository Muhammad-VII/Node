const { add_blog, getAllBlogs } = require("../Controller/Blogs.controller");
const router = require("express").Router();

router.get("/blogs", getAllBlogs);
router.post("/addBlog", add_blog);

module.exports = router;
