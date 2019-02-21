/**
 * Imports
 */
// Express
const { Router } = require("express");
proxy = require("express-http-proxy");

/**
 * Config
 */
const couchProxyRouter = Router();

class CouchProxyRouterClass {
  routes() {
    couchProxyRouter.all("/:path*?", proxy(process.env.COUCH_SERV));
  }

  init() {
    this.routes();
    return couchProxyRouter;
  }
}

/**
 * Export
 */
module.exports = CouchProxyRouterClass;
