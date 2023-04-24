import { check, validationResult } from "express-validator";

export const registerValidation = [
  check("name").not().isEmpty().withMessage("Name is required!"),
  check("email").isEmail().withMessage("Please provide a valid email!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long!"),
  check("role").not().isEmpty().withMessage("Role is required!"),
];

export const registerValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: errors.array()[0].msg });
  }
  next();
};
