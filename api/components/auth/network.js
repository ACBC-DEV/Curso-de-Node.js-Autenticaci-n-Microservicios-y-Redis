const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.use(express.json());

/**
 * POST /login
 * Log in a user and return a token.
 * @param {express.Request} req - Express request object, expecting a body with `username` and `password`.
 * @param {express.Response} res - Express response object.
 */
router.post("/login", (req, res) => {
  Controller.login(req.body.username, req.body.password)
    .then((token) => {
      response.success(req, res, token, 200);
    })
    .catch((err) => {
      response.error(req, res, "informacion in Validad", 400);
    });
});

module.exports = router;
