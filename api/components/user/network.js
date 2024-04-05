const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.use(express.json());
/**
 * @swagger
 * /:
 * get:
 * summary: List all users
 * description: Get all users
 * responses:
 * 200:
 * description: Success
 * 500:
 * description: Server error
 *
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
 *  @swagger
 * /{id}:
 *  get:
 *   summary: Get user by id
 *  description: Get user by id
 * parameters:
 * - in: path
 *  name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Success
 * 404:
 * description: Not found
 * 500:
 * description: Server error
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
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove list
 *     description: Remove a list based on the provided id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: The list was successfully removed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 *       500:
 *         description: There was an error processing the request.
 */
router.delete("/:id", async (req, res) => {
  try {
    const list = await Controller.remove(req.params.id);
    console.log(req.body);
    response.success(req, res, list, 201);
  } catch (err) {
    response.error(req, res, err.message, 500);
  }
});

module.exports = router;
