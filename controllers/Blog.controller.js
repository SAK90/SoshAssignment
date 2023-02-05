const User = require("../models/User.model.js");
const Blog = require("../models/Blog.model.js");
const ResponseWrapper = require("../helpers/ResponseWrapper.js");
const { response } = require("express");

module.exports = {
  CreateBlog: async (req, res, next) => {
    try {
      const Email = req.user;
      const user = await User.findOne({ Email: Email });
      if (!user) {
        return res
          .status(400)
          .json(ResponseWrapper(false, null, "User does not exist"));
      }
      const blog = new Blog({
        Title: req.body.Title,
        Description: req.body.Description,
        CreatedBy: user._id,
      });
      const savedBlog = await blog.save();
      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { Blogs: savedBlog } }
      );
      return res
        .status(200)
        .json(ResponseWrapper(true, savedBlog, "Blog added to user"));
    } catch (err) {
      next(err);
    }
  },

  UpdateBlog: async (req, res, next) => {
    try {
      const BlogID = req.params.id;
      const blog = await Blog.findByIdAndUpdate(BlogID, req.body);
      res.status(200).json(ResponseWrapper(true, blog, "Blog updated."));
    } catch (err) {
      next(err);
    }
  },

  GetBlogs: async (req, res, next) => {
    try {
      const Email = req.user;
      console.log(Email);
      const _user = await User.findOne({ Email: Email }).populate("Blogs");
      res
        .status(200)
        .json(ResponseWrapper(true, _user.Blogs, "User's blogs fetched"));
    } catch (err) {
      next(err);
    }
  },

  DeleteBlog: async (req, res, next) => {
    try {
      const Email = req.user;
      const BlogID = req.params.id;
      Blog.findByIdAndDelete(BlogID, (err) => {
        if (err) {
          return res
            .status(400)
            .json(ResponseWrapper(false, err, "Error occoured"));
        }
      });
      res.status(200).json(ResponseWrapper(true, null, "Blog deleted"));
    } catch (err) {
      next(err);
    }
  },
};
