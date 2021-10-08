const mongoose = require("mongoose");
const blogsSchema = require("../Scheme/Blogs.scheme");
const Blogs = mongoose.model("blog", blogsSchema);

module.exports = Blogs;