const { validationResult } = require("express-validator");

exports.validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
