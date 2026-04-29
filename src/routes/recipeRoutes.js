//Step 6 of recipe endpoint

import express from "express";
import { getAllRecipesHandler, getRecipeByIdHandler, createRecipeHandler, updateRecipeHandler, deleteRecipeHandler } from "../controllers/recipeController.js"; 
import { getRecipeIngredientsHandler, addIngredientToRecipeHandler, removeIngredientFromRecipeHandler} from "../controllers/recipeIngredientController.js";
import { validateId, validateCreateRecipe, validateUpdateRecipe, validateRecipeQuery } from "../middleware/recipeValidator.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRecipeOwnership, authorizeRecipeOwnershipORAdmin } from "../middleware/authorizeOwnership.js";
import { validateAddIngredient } from "../middleware/recipeIngredientValidator.js";

const router = express.Router();

router.get('/', validateRecipeQuery, getAllRecipesHandler); //endpoint for getting all recipes
router.get('/:id', validateId, getRecipeByIdHandler); //endpoint for getting a recipe by id
router.post('/', authenticate, validateCreateRecipe, createRecipeHandler); //endpoint for creating a recipe
router.put('/:id', authenticate, validateId, authorizeRecipeOwnership, validateUpdateRecipe, updateRecipeHandler); //endpoint for updating a recipe
router.delete('/:id', authenticate, validateId, authorizeRecipeOwnershipORAdmin, deleteRecipeHandler); //endpoint for deleting a recipe


//RECIPE-INGREDIENT ENDPOINT
router.get('/:id/ingredients', validateId, getRecipeIngredientsHandler); //endpoint for getting all ingredients of a recipe
router.post('/:id/ingredients', authenticate, validateId, authorizeRecipeOwnership, validateAddIngredient, addIngredientToRecipeHandler); //endpoint for adding an ingredient to a recipe
router.delete('/:id/ingredients/:ingredientId', authenticate, validateId, authorizeRecipeOwnership, removeIngredientFromRecipeHandler); //endpoint for removing an ingredient from a recipe


export default router;