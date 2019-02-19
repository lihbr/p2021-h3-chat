/**
 * Imports
 */
// Express
const { Router } = require("express");

// Inner
const chanController = require("../controllers/chan.ctrl.js");

/**
 * Config
 */
const chanRouter = Router();

class ChanRouterClass {
  routes() {
    chanRouter.post("/create", chanController.create, chanController.join);
    chanRouter.post("/join", chanController.join);
    // chanRouter.post("/leave", chanController.leave);
  }

  init() {
    this.routes();
    return chanRouter;
  }
}

/**
 * Export
 */
module.exports = ChanRouterClass;
