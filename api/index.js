const express = require("express");
const bodyParser = require("body-parser");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const config = require("../config.js");
const swaggerDoc = require("./swagger.json");
const options = {
  info: {
    version: "1.0.0",
    title: "Albums store",
    license: {
      name: "MIT",
    },
  },
  security: {
    BasicAuth: {
      type: "http",
      scheme: "basic",
    },
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
  // URL where SwaggerUI will be rendered
  swaggerUIPath: "/api-docs",
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: "/v3/api-docs",
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

const app = express();

expressJSDocSwagger(app)(options, swaggerDoc);

app.use("/api/user", user);
app.use("/api/auth", auth);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.listen(config.api.port, () => {
  console.log("Example app listening on port ", config.api.port);
});
