import { param, body, oneOf, query } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

export const validateId = [
    param("id")
        .trim()
        .escape()
        .isInt({min: 1})
        .withMessage("ID must be a positive integer."),
    handleValidationErrors
];

export const validateAddIngredient = [
    body("ingredientId")
        .exists({values: "falsy"})
        .withMessage("Ingredient ID is required.")
        .bail()
        .trim()
        .escape()
        .isInt({min: 1})
        .withMessage("Ingredient ID must be a positive integer.")
    ,
    body('amount')
        .exists({ values: 'falsy' })
        .withMessage('Amount is required.')
        .bail()
        .isFloat({ min: 0.1 })
        .withMessage('Amount must be a positive number.')
    ,
    body("unit")
        .exists({values: "falsy"})
        .withMessage("Unit is required.")
        .bail()
        .trim()
        .escape()
        .isLength({min: 1})
        .withMessage("Unit must be at least 1 character.")
    ,
    handleValidationErrors
];