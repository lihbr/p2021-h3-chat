require("dotenv").config();
const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const httpProxy = require("http-proxy");

const couchProxy = httpProxy.createProxyServer({
  target: "127.0.0.1:5984"
});

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    console.log(process.env.NODE_ENV);
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // temp
  app.all("/db", (req, res) => {
    couchProxy.web(req, res);
  });
  // temp

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
