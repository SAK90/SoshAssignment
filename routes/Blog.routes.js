const express = require("express");
const router = express.Router();
const Authorize = require("../middleware/Authorize.js");
const BlogController = require("../controllers/Blog.controller.js");

router.post("/createBlog", Authorize, BlogController.CreateBlog);
router.get("/getBlogs", Authorize, BlogController.GetBlogs);
router.put("/updateBlog/:id", Authorize, BlogController.UpdateBlog);
router.delete("/deleteBlog/:id", Authorize, BlogController.DeleteBlog);

module.exports = router;
