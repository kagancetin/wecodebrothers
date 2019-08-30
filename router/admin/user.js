const express = require('express');
const router = express.Router();

const UserController = require('../../controller/admin/user');
const {
    validateBody,
    schemas
} = require("../../helper/validateInput");

router.route('/get/:username').post(UserController.getUser);
router.route('/get').post(UserController.getUsers);

router.route('/profile/:username').patch(validateBody(schemas.profileSchema), UserController.updateUserProfile);

router.route('/').post(UserController.getUsers);
router.route('/:id').patch(UserController.updateUser);
router.route('/:id').delete(UserController.deleteUser);

module.exports = router;