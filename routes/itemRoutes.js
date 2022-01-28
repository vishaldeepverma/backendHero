require("dotenv").config();
const express = require("express");
const { validate } = require("../validations/itemValidation");
const { validationErrorHandler } = require("../utility/validationErrorHandler");


const {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
} = require("../controllers/itemController");

const router = express.Router();

/**
 * @swagger
 * /api/item:
 *   post:
 *     description: add items
 *     parameters:
 *      - name: title
 *        description: title of the book
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 */

router.post("/", validate("createItem"), validationErrorHandler, createItem);

router.get("/", getAllItems);

router.get(
  "/:itemId",
  getItemById
);

router.put(
  "/",
  updateItemById
);

router.delete(
  "/:itemId",
  validate("deleteItemById"),
  validationErrorHandler,
  deleteItemById
);

module.exports = router;
