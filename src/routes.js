const routes = require("express").Router();

routes.get("/", (req, res) => {
  return res.json({
    name: "nodejs-upload-files",
    version: "1.0.0"
  });
});

module.exports = routes;
