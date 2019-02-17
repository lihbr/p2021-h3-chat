/**
 * Imports
 */
// Misc
require("dotenv").config();
const consola = require("consola");

// Express
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Nuxt
const { Nuxt, Builder } = require("nuxt");

// Inner
const mainRouter = require("./routes/main.router");

/**
 * Config
 */
// Main
const server = express();
const port = process.env.PORT || 3000;

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

class ServerClass {
  async init() {
    // Set port
    server.set("port", port);

    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    // Build only in dev mode
    if (!process.env.EXPRESS_ONLY && config.dev) {
      const builder = new Builder(nuxt);
      await builder.build();
    }

    // Body-parser
    server.use(bodyParser.json({ limit: "10mb" }));
    server.use(bodyParser.urlencoded({ extended: true }));

    // Cookie-parser
    server.use(cookieParser());

    // Main router
    server.use("/", mainRouter);

    // Give nuxt middleware to express, default fallback
    server.use(nuxt.render);

    // Save server
    this.launch();
  }

  launch() {
    server.listen(server.get("port"), () => {
      consola.ready({
        message: `Server listening on port: ${server.get("port")}`,
        badge: true
      });
    });
  }
}

new ServerClass().init();
