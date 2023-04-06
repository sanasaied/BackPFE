const express = require("express");
const { checkSchema } = require("express-validator");
const { validate } = require("../middlewares/validate.schema");
const { user } = require("../models/user.model");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.patch("/update", userController.updateUser);

router.post(
  "/auth/register",
  authController.register
);
router.post("/auth/login", authController.login);
router.patch("/auth/activate", authController.activateAccount);
router.get('/auth/verify', authController.verifyCode);
router.patch('/auth/reset', authController.resetPassword);
router.patch('/auth/update', authController.updatePassword);

module.exports = router;
