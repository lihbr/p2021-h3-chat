/**
 * Imports
 */
// Express
const { Router } = require("express");

// Inner
const AuthRouterClass = require("./auth.router");
const ChanRouterClass = require("./chan.router");
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
const frontRouter = new FrontRouterClass();

// Genealogy
mainRouter.use("/api", apiRouter);

apiRouter.use("/auth", authRouter.init());
apiRouter.use("/chan", chanRouter.init());
mainRouter.use("/", frontRouter.init());

/**
 * Export
 */
module.exports = mainRouter;
