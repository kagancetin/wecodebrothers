const express = require("express");
const router = express.Router();

const IndexController = require("../../controller/admin/blog");

router.route("/").post(IndexController.getBlogs);
router.route("/:title").post(IndexController.getBlogs);
router.route("/addBlog").post(IndexController.addBlog);

module.exports = router;
