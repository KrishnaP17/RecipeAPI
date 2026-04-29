//Step 4 of recipe/ingredient/collection endpoint

import { getRecipeById } from "../services/recipeService.js";
import { getCollectionById } from "../services/collectionService.js";

//RECIPES
export async function authorizeRecipeOwnership(req, res, next){
    const id = parseInt(req.params.id);
    const recipe = await getRecipeById(id);
    if(recipe.authorId !== req.user.id){  //if the recipe's authorId (user id) doesn't match the logged in user's id, they don't have the permission to perform that action
        const error = new Error("Forbidden: insufficient permission.");
        error.status = 403;
        throw error;
    }
    next();
}
//this function it's not limited to getRecipeById. It fetches the recipe by req.params.id and checks if recipe.authorId === req.user.id. It can be applied to any route that has an :id param.
//It only "looks" tied to getRecipeById because that's the service function it uses internally to fetch the recipe for the ownership check — but that's just a lookup, not the actual operation being performed.


export async function authorizeRecipeOwnershipORAdmin(req, res, next){
    if(req.user.role === "ADMIN") return next(); //if the logged in user is an admin, they have the permission to perform that action for recipes
    return authorizeRecipeOwnership(req, res, next);
}


//INGREDIENTS
//Ingredients aren't owned by users like recipes are, so we don't need an authorizeIngredientsOwnership function.
//for put and delete only handled by the ADMIN, just put authorizeRoles("ADMIN") in the ingredientRoute.js


//COLLECTIONS
export async function authorizeCollectionOwnership(req, res, next){
    const id = parseInt(req.params.id);
    const collection = await getCollectionById(id);
    if(collection.authorId !== req.user.id){  //if the collection's authorId (user id) doesn't match the logged in user's id, they don't have the permission to perform that action
        const error = new Error("Forbidden: insufficient permission.");
        error.status = 403;
        throw error;
    }
    next();
}
