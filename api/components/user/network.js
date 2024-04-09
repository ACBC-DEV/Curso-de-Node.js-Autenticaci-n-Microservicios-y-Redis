const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");
const secure = require("./secure");
const router = express.Router();

router.use(express.json());

router.get("/", getUser);
router.get("/:id", getByID);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/", secure("update"), putUser);
function getUser(req, res) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

function getByID(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}

async function postUser(req, res) {
  try {
    const list = await Controller.upsert(req.body);
    console.log(req.body);
    response.success(req, res, list, 201);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}

async function deleteUser(req, res) {
  try {
    const list = await Controller.remove(req.params.id);
    console.log(req.body);
    response.success(req, res, list, 201);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
}
function putUser(req, res) {
  Controller.update(req.body)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
}
module.exports = router;
