//STEP 8 OF AUTH ENDPOINT

import express from "express";
import { signUpHandler, logInHandler } from "../controllers/authController.js";
import { validateSignUp, validateLogIn } from "../middleware/userValidator.js";

const router = express.Router();

router.post('/signup', validateSignUp, signUpHandler); //endpoint for sign up user
router.post('/login', validateLogIn, logInHandler); //endpoint for log in user

export default router;
