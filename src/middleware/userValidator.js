//STEP 5 OF AUTH ENDPOINT
import { handleValidationErrors } from "./handleValidationErrors.js";
import { body } from "express-validator";

export const validateSignUp = [
    body('email')
        .trim()
        .exists({ values: 'falsy'})
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email is invalid')
        .bail()
        .normalizeEmail(),

    body('password')
        .trim()
        .exists({ values: 'falsy'})
        .withMessage('Password is required')
        .bail()
        .isLength({min: 8, max: 64})
        .withMessage('Password must contain at least 8 characters and at most 64 characters'),

    body('role')
        .optional()
        .isIn(['USER', 'ADMIN'])
        .withMessage('Role must be either USER or ADMIN')

    ,handleValidationErrors

];

export const validateLogIn = [
    body('email')
        .trim()
        .exists({ values: 'falsy'})
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email is invalid')
        .bail()
        .normalizeEmail(),

    body('password')
        .trim()
        .exists({ values: 'falsy'})
        .withMessage('Password is required')

    ,handleValidationErrors

];
