//Step 6 of the ingredient endpoint

import express from "express";
import { getAllIngredientsHandler, getIngredientByIdHandler, createIngredientHandler, updateIngredientHandler, deleteIngredientHandler } from "../controllers/ingredientController.js";
import { validateId, validateCreateIngredient, validateUpdateIngredient, validateIngredientQuery } from "../middleware/ingredientValidator.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get('/', validateIngredientQuery, getAllIngredientsHandler); //endpoint for getting all ingredients
router.get('/:id', validateId, getIngredientByIdHandler); //endpoint for getting an ingredient by id
router.post('/', authenticate, validateCreateIngredient, createIngredientHandler); //endpoint for creating an ingredient
router.put('/:id', authenticate, authorizeRoles("ADMIN"), validateId, validateUpdateIngredient, updateIngredientHandler); //endpoint for updating an ingredient
router.delete('/:id', authenticate, authorizeRoles("ADMIN"), validateId, deleteIngredientHandler); //endpoint for deleting an ingredient

export default router;