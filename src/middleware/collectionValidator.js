//step 5 of collection endpoint

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

export const validateCreateCollection = [
    body("name")
        .exists({values: "falsy"})
        .withMessage("Name is required.")
        .bail()
        .trim()
        .escape()
        .isLength({min: 1, max: 200})
        .withMessage("Name must be between 1 and 200 characters."),
    body("description")
        .exists({values: "falsy"})
        .withMessage("Description is required.")
        .bail()
        .trim()
        .escape()
        .isLength({min: 3})
        .withMessage("Description must be at least 3 characters."),
    handleValidationErrors
];

export const validateUpdateCollection = [
    oneOf(
        [
            body('name').exists({ values: 'falsy' }),
            body('description').exists({ values: 'falsy' }),
        ], 
        { message: 'At least one field must be provided' }),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('Name must be at least 1 character'),
    body('description')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Description must be at least 3 characters'),
    handleValidationErrors,
];

export const validateCollectionQuery = [
    query('sortBy')
        .optional()
        .isIn(['id', 'name', 'description', 'createdAt'])
        .withMessage('sortBy must be one of id, name, description, createdAt'),
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