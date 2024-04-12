const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.use(express.json());

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
function list(req, res, next) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
}
function get(req, res, next) {
  Controller.get(req.params.id)
    .then((post) => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((post) => {
      response.success(req, res, post, 201);
    })
    .catch(next);
}
module.exports = router;
