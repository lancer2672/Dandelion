const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { body } = require("express-validator");

router.post(
  "/login",
  body("username").exists().withMessage("Username is missing"),
  body("password").exists().withMessage("Password is missing"),
  AuthController.login
);

router.post("/google", AuthController.loginWithGoogle);

router.post(
  "/register",
  body("password").exists().withMessage("Password is missing"),
  body("email").exists().withMessage("Email is missing"),
  AuthController.register
);

router.post("/refresh-token", AuthController.refreshToken);

router.post("/send-email-verification", AuthController.sendEmailVerification);
router.get("/verify-email", AuthController.verifyEmail);
router.post(
  "/reset-password",
  body("newPassword").exists().withMessage("newPassword is missing"),
  body("email").exists().withMessage("email is missing"),
  AuthController.resetPassword
);

module.exports = router;
