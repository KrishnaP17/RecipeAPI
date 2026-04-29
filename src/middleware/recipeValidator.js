//Step 5 of recipe endpoint

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

export const validateCreateRecipe = [
    body("title")
        .exists({values: "falsy"})
        .withMessage("Title is required.")
        .bail()
        .trim()
        .escape()
        .isLength({min: 3, max: 200})
        .withMessage("Title must be between 3 and 200 characters."),
    body("instructions")
        .exists({values: "falsy"})
        .withMessage("Instructions are required.")
        .bail()
        .trim()
        .escape()
        .isLength({min: 3})
        .withMessage("Instructions must be at least 3 characters."),
    body("prepTime")
        .exists({values: "falsy"})
        .withMessage("Prep time is required.")
        .bail()
        .isInt({min: 1})
        .withMessage("Prep time must be a positive integer."),
    body("difficulty")
        .exists({values: "falsy"})
        .withMessage("Difficulty is required.")
        .bail()
        .isIn(["EASY", "MEDIUM", "HARD"])
        .withMessage("Difficulty must be EASY, MEDIUM, or HARD."),
    handleValidationErrors
];

export const validateUpdateRecipe = [
    oneOf(
        [
            body('title').exists({ values: 'falsy' }),
            body('instructions').exists({ values: 'falsy' }),
            body('prepTime').exists({ values: 'falsy' }),
            body('difficulty').exists({ values: 'falsy' }),
        ], 
        { message: 'At least one field must be provided' }),
    body('title')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),
    body('instructions')
        .optional()
        .trim()
        .isLength({ min: 10 })
        .withMessage('Instructions must be at least 10 characters'),
    body('prepTime')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Prep time must be a positive integer'),
    body('difficulty')
        .optional()
        .isIn(['EASY', 'MEDIUM', 'HARD']).withMessage('Difficulty must be EASY, MEDIUM, or HARD'),
    handleValidationErrors,
];


export const validateRecipeQuery = [
    query('sortBy')
        .optional()
        .isIn(['id', 'title', 'prepTime', 'difficulty', 'createdAt'])
        .withMessage('sortBy must be one of id, title, prepTime, difficulty, createdAt'),
    query('order')
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('order must be asc or desc'),
    query('offset')
        .optional()
        .isInt({ min: 0 })
        .withMessage('offset must be a non-negative integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('limit must be between 1 and 50'),
    handleValidationErrors,
];
