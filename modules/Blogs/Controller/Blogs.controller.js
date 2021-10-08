const Blogs = require("../Model/Blogs.model");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    res.json({ message: "All blogs", data: blogs });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

const add_blog = async (req, res) => {
  const { title, content, createdBy } = req.body;
  try {
    const blogs = new Blogs({ title, content, createdBy });
    await blogs.save();
    res.json({ message: "blog added", blogs });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

module.exports = {
    getAllBlogs,
    add_blog
}