//Step 2 of recipe endpoint

import { getAll, getById, create, update, remove } from "../repositories/recipeRepo.js";

//get all recipes
export async function getAllRecipes(options){
    return await getAll(options);
}

//get a recipe by id
export async function getRecipeById(id){
    const recipe = await getById(id);
    if(recipe) return recipe;
    else{
        const error = new Error(`Recipe ${id} not found`); //if recipe id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
}

//create a recipe
export async function createRecipe(data){
    return await create(data);
}

//update a recipe
export async function updateRecipe(id, updatedData){
    const updatedRecipe = await update(id, updatedData);
    if(updatedRecipe) return updatedRecipe;
    else{
        const error = new Error(`Recipe ${id} not found`); //if recipe id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
    
}

//delete a recipe
export async function deleteRecipe(id){
    const deletedRecipe = await remove(id);
    if(deletedRecipe) return;
    else{
        const error = new Error(`Recipe ${id} not found`); //if recipe id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
}