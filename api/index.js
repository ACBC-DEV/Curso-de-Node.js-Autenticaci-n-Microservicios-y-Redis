const express = require("express");
const config = require("../config.js");

const user = require("./components/user/network");

const app = express();

app.use("/api/v1/user", user);

app.listen(config.api.port, () => {
  console.log("Example app listening on port ", config.api.port);
});
