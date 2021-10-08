const Blogs = require("../Model/Blogs.model");

const getAllBlogs = async (req, res) => {
  let { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  try {
    const blogs = await Blogs.find({})
      .populate("createdBy")
      .limit(limit)
      .skip(skip);
    const all = await Blogs.count();
    const totalPages = Math.ceil(all / limit)
    res.json({ message: "All blogs", page, size, totalPages, data: blogs });
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
  add_blog,
};
