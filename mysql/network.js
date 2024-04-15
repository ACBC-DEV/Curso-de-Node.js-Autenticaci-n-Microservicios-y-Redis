const express = require("express");

const response = require("../network/response");
const Store = require("../store/mysql");
const router = express.Router();

router.get("/:tabla", list);
router.get("/:tabla/:id", get);
router.post("/:tabla", insert);
router.put("/:tabla", upsert);
router.post("/:tabla/query", query);

async function list(req, res, next) {
  try {
    const datos = await Store.list(req.params.tabla);
    response.success(req, res, datos, 200);
  } catch (err) {
    next(err);
  }
}

async function get(req, res, next) {
  try {
    const datos = await Store.get(req.params.tabla, req.params.id);
    response.success(req, res, datos, 200);
  } catch (err) {
    next(err);
  }
}

async function insert(req, res, next) {
  try {
    const datos = await Store.insert(req.params.tabla, req.body);
    response.success(req, res, datos, 201);
  } catch (err) {
    next(err);
  }
}

async function upsert(req, res, next) {
  try {
    const datos = await Store.upsert(req.params.tabla, req.body);
    response.success(req, res, datos, 201);
  } catch (err) {
    next(err);
  }
}

async function query(req, res, next) {
  try {
    const datos = await Store.query(req.params.tabla, req.body);
    response.success(req, res, datos, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
