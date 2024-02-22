const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.use(express.json());
/** 
 *@summary get list user
  @returns list users
 */
router.get("/", (req, res) => {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

/**
 * @summary get user by ID
 * @returns user
 */
router.get("/:id", (req, res) => {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});
/**
 * @swagger
 * /:
 *   post:
 *     summary: Upsert list
 *     description: Upsert a list based on the provided data in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/List'
 *     responses:
 *       201:
 *         description: The list was successfully created or updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 *       500:
 *         description: There was an error processing the request.
 */
router.post("/", async (req, res) => {
  try {
    const list = await Controller.upsert(req.body);
    console.log(req.body);
    response.success(req, res, list, 201);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

module.exports = router;
