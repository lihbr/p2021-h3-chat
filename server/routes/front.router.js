/**
 * Imports
 */
// Express
const { Router } = require("express");

// Inner
const frontController = require("../controllers/front.ctrl.js");

/**
 * Config
 */
const frontRouter = Router();

class FrontRouterClass {
  routes() {
    frontRouter.get("*", frontController.redirect);
  }

  init() {
    this.routes();
    return frontRouter;
  }
}

/**
 * Export
 */
module.exports = FrontRouterClass;
