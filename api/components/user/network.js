const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");
const secure = require("./secure");
const router = express.Router();

router.use(express.json());

router.get("/", getUser);
router.get("/:id", getByID);
router.get("/followers/:id", following);
router.post("/follow/:id", secure("follow"), follow);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/", secure("update"), putUser);
function getUser(req, res, next) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
}

function getByID(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

async function postUser(req, res, next) {
  try {
    const list = await Controller.upsert(req.body);
    console.log(req.body);
    response.success(req, res, list, 201);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const list = await Controller.remove(req.params.id);
    console.log(req.body);
    response.success(req, res, list, 201);
  } catch (err) {
    next(err);
  }
}
function putUser(req, res, next) {
  Controller.update(req.body)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function follow(req, res, next) {
  console.log("user ID", req.user);
  console.log("reques id", req.params.id);
  Controller.follow(req.user, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function following(req, res, next) {
  console.log("following");
  Controller.following(req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}
module.exports = router;
