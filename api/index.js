const express = require("express");
// const bodyParser = require("body-parser");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const config = require("../config.js");
const swaggerDoc = require("./swagger.json");
const options = require("../swagger.js");

const app = express();

expressJSDocSwagger(app)(options, swaggerDoc);

app.use("/api/user", user);
app.use("/api/auth", auth);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.listen(config.api.port, () => {
  console.log("Example app listening on port ", config.api.port);
});
