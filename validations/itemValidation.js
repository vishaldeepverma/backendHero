const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createItem": {
      return [
        body("name")
          .exists()
          .withMessage("Item name is required")
          .isLength({ min: 3 })
          .withMessage("Item name should have at least 3 characters"),
        body("type")
          .exists()
          .withMessage("Item type is required")
          .isLength({ min: 3 })
          .withMessage("Item type should have at least 3 characters"),
        body("price")
          .exists()
          .withMessage("Item price is required")
          .isLength({ min: 1 })
          .withMessage("Item price should have at least 3 characters"),
        body("warranty")
          .exists()
          .withMessage("Item price is required")
          .isLength({ min: 1 })
          .withMessage("Item price should have at least 3 characters"),
        body("dateOfManufacture")
          .exists()
          .withMessage("Item date of manufacture is required")
          .isDate()
          .withMessage("Item date of manufacture is invalid"),
      ];
    }
    case "getAllItems": {
      return [];
    }
    case "getItemById": {
      return [
        body("name")
          .isLength({ min: 3 })
          .withMessage("Name should have at least 3 characters"),
      ];
    }
    case "updateItemById": {
      return [
        body("name")
          .isLength({ min: 3 })
          .withMessage("Name should have at least 3 characters"),
      ];
    }
    case "deleteItemById": {
      return [
        body("name")
          .isLength({ min: 3 })
          .withMessage("Name should have at least 3 characters"),
      ];
    }
  }
};
