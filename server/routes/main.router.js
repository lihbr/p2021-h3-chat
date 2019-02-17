/**
 * Imports
 */
// Express
const { Router } = require("express");

// Inner
const AuthRouterClass = require("./auth.router");

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

/**
 * Export
 */
module.exports = mainRouter;
