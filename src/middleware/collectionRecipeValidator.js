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

export const validateAddRecipe = [
    body("recipeId")
        .exists({values: "falsy"})
        .withMessage("Recipe ID is required.")
        .bail()
        .trim()
        .escape()
        .isInt({min: 1})
        .withMessage("Recipe ID must be a positive integer.")
    ,
    handleValidationErrors
];