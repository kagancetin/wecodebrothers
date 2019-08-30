const express = require("express");
const router = express.Router();

const IndexController = require("../../controller/admin/admin");
const sessionController = require("../../helper/session");
const {
    validateBody,
    schemas
} = require("../../helper/validateInput");

router.route("/").get(sessionController.sessionCheck, IndexController.goDashboard);
router.route("/dashboard").get(sessionController.sessionCheck, IndexController.getDashboard);
router.route("/signin").get(IndexController.getSignIn);
router.route("/blogs").get(sessionController.sessionCheck, IndexController.getBlogs);
router.route("/blogadd").get(sessionController.sessionCheck, IndexController.getBlogAdd);
router.route("/images").get(sessionController.sessionCheck, IndexController.getImages);
router.route("/profile").get(sessionController.sessionCheck, IndexController.getProfile);
router.route("/forgot-password").get(sessionController.sessionCheck, IndexController.getForgot);
router.route("/pagesIndex").get(sessionController.sessionCheck, IndexController.getpagesIndex);
router.route("/pagesAbout").get(sessionController.sessionCheck, IndexController.getpagesAbout);
router.route("/pagesContact").get(sessionController.sessionCheck, IndexController.getpagesContact);
router.route("/pagesBlog").get(sessionController.sessionCheck, IndexController.getpagesBlog);
router.route("/pagesWorks").get(sessionController.sessionCheck, IndexController.getpagesWorks);
router.route("/userSettings").get(sessionController.sessionCheck, IndexController.getUserSettings);

//! SESSION
router.route("/signin").post(validateBody(schemas.signinSchema), sessionController.sessionSave);
router.route("/logout").post(sessionController.sessionKill);


module.exports = router;