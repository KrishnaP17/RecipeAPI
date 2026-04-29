//step 6 of the collection endpoint

import express from "express";
import { getAllCollectionsHandler, getCollectionByIdHandler, createCollectionHandler, updateCollectionHandler, deleteCollectionHandler } from "../controllers/collectionController.js";
import { validateId, validateCreateCollection, validateUpdateCollection, validateCollectionQuery } from "../middleware/collectionValidator.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeCollectionOwnership } from "../middleware/authorizeOwnership.js";
import { getCollectionRecipesHandler, addRecipeToCollectionHandler, removeRecipeFromCollectionHandler} from "../controllers/collectionRecipeController.js";
import { validateAddRecipe } from "../middleware/collectionRecipeValidator.js";

const router = express.Router();

router.get('/', authenticate,validateCollectionQuery, getAllCollectionsHandler); //endpoint for getting all collections of the user logged in
router.get('/:id', authenticate, validateId, authorizeCollectionOwnership,getCollectionByIdHandler); //endpoint for getting a collection by id of the user thats logged in
router.post('/', authenticate, validateCreateCollection, createCollectionHandler); //endpoint for creating a collection
router.put('/:id', authenticate, validateId, authorizeCollectionOwnership, validateUpdateCollection, updateCollectionHandler); //endpoint for updating a collection
router.delete('/:id', authenticate, validateId, authorizeCollectionOwnership, deleteCollectionHandler); //endpoint for deleting a collection


//COLLECTION-RECIPES ENDPOINT
router.get('/:id/recipes', authenticate, validateId, authorizeCollectionOwnership, getCollectionRecipesHandler); //endpoint for getting all recipes in a collection made by the user logged in
router.post('/:id/recipes', authenticate, validateId, authorizeCollectionOwnership, validateAddRecipe, addRecipeToCollectionHandler); //endpoint for adding a recipe to a collection made by the user logged in
router.delete('/:id/recipes/:recipeId', authenticate, validateId, authorizeCollectionOwnership, removeRecipeFromCollectionHandler);


export default router;