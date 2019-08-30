const express = require('express');
const router = express.Router();

const IndexController = require('../../controller/page/index');

router.route('/').get(IndexController.index);
router.route('/post').get(IndexController.post);
router.route('/contact').get(IndexController.contact);
router.route('/about').get(IndexController.about);

module.exports = router;