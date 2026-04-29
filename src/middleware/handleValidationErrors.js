//STEP 4 OF AUTH ENDPOINT
import { validationResult } from "express-validator";

export function handleValidationErrors(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}