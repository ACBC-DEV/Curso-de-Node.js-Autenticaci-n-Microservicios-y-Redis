const express = require("express");
const bodyParser = require("body-parser");
const errors = require("../network/errors");
const config = require("../config");
const post = require("./components/post/network");
const app = express();
app.use(bodyParser.json());

app.use("/api/post", post);
app.use(errors);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.listen(config.post.port, () => {
  console.log("Api working on the port ", config.post.port);
});
