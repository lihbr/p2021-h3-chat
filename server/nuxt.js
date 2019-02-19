/**
 * Create nuxt
 */
const { Nuxt } = require("nuxt");
const config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");
// Init Nuxt.js
exports.nuxt = new Nuxt(config);
