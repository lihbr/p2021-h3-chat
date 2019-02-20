/**
 * Imports
 */
// Express
const { Router } = require("express");

// Nuxt
const { nuxt } = require("../nuxt");

// Inner
const frontController = require("../controllers/front.ctrl.js");

/**
 * Config
 */
const frontRouter = Router();

class FrontRouterClass {
  routes() {
    frontRouter.get("/connect", frontController.isLoggedIn, nuxt.render);
    frontRouter.get(
      "/channel/:slug*?",
      frontController.isLoggedOut,
      nuxt.render
    );
    frontRouter.get("/dm/:hash*?", frontController.isLoggedOut, nuxt.render);
    frontRouter.get("/", frontController.isLoggedOut, nuxt.render);
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
