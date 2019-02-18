/**
 * Imports
 */
// Express
const { Router } = require("express");

// Inner
const AuthRouterClass = require("./auth.router");
const ChanRouterClass = require("./chan.router");

/**
 * Config
 */
// Parent
const mainRouter = Router();
const apiRouter = Router();

// Child
const authRouter = new AuthRouterClass();

// Genealogy
mainRouter.use("/api", apiRouter);

apiRouter.use("/auth", authRouter.init());
apiRouter.use("/chan", chanRouter.init());

/**
 * Export
 */
module.exports = mainRouter;
