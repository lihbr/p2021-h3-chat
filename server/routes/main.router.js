/**
 * Imports
 */
// Express
const { Router } = require("express");

// Inner
const AuthRouterClass = require("./auth.router");
const ChanRouterClass = require("./chan.router");
const CouchProxyRouterClass = require("./couch.proxy.router");
const FrontRouterClass = require("./front.router");

/**
 * Config
 */
// Parent
const mainRouter = Router();
const apiRouter = Router();

// Child
const authRouter = new AuthRouterClass();
const chanRouter = new ChanRouterClass();
const couchProxyRouter = new CouchProxyRouterClass();
const frontRouter = new FrontRouterClass();

// Genealogy
mainRouter.use("/api", apiRouter);

apiRouter.use("/auth", authRouter.init());
apiRouter.use("/chan", chanRouter.init());
apiRouter.use("/couchproxy", couchProxyRouter.init());
mainRouter.use("/", frontRouter.init());

/**
 * Export
 */
module.exports = mainRouter;
