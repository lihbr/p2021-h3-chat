/**
 * Imports
 */
// Express
const { Router } = require("express");

// Inner
const authController = require("../controllers/auth.ctrl.js");

/**
 * Config
 */
const authRouter = Router();

class AuthRouterClass {
  routes() {
    authRouter.post("/signup", authController.signUp, authController.signIn);
    authRouter.post("/signin", authController.signIn);
    authRouter.post("/changepassword", authController.changePassword);
  }

  init() {
    this.routes();
    return authRouter;
  }
}

/**
 * Export
 */
module.exports = AuthRouterClass;
