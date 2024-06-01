import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../helper/ApiResponse";

function validationCheck(req: Request, res: Response, next: NextFunction) {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(new ApiResponse(400, { error: error.array() },"All field are required with proper validation."));
  }
  next();
}
export const validateAdminRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 255 })
    .withMessage("Password must be at least 6 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validationCheck,
];

export const validateLogin = [
  body("username").notEmpty().withMessage("Username or email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validationCheck,
];

export const validateUser = [
  body("first_name")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 255 })
    .withMessage("First name must be less than 255 characters"),

  body("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 255 })
    .withMessage("Last name must be less than 255 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("ne-NP")
    .withMessage("Invalid phone number"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["m", "f", "o"])
    .withMessage("Invalid gender"),

  body("address").notEmpty().withMessage("Address is required"),
  validationCheck,
];

export const validateUserUpdate = [
  body("first_name")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 255 })
    .withMessage("First name must be less than 255 characters"),

  body("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 255 })
    .withMessage("Last name must be less than 255 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("ne-NP")
    .withMessage("Invalid phone number"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["m", "f", "o"])
    .withMessage("Invalid gender"),

  body("address").notEmpty().withMessage("Address is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(400)
        .json(new ApiResponse(400, { error: error.array() }));
    }
    next();
  },
];

export const validateArtist = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 255 })
    .withMessage("Name must be less than 255 characters"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["m", "f", "o"])
    .withMessage("Gender must be one of: m, f, o"),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ max: 255 })
    .withMessage("Address must be less than 255 characters"),

  body("first_release_year")
    .notEmpty()
    .withMessage("First release year is required")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("First release year must be a valid year"),

  body("no_of_albums_released")
    .notEmpty()
    .withMessage("Number of albums released is required")
    .isInt({ min: 0 })
    .withMessage("Number of albums released must be a non-negative integer"),
  validationCheck,
];
