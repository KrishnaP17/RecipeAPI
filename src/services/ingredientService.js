//step 2 of the ingredient endpoint

import { getAll, getById, create, update, remove } from "../repositories/ingredientRepo.js";

//get all ingredients
export async function getAllIngredients(options) {
    return await getAll(options);
}

//get an ingredient by id
export async function getIngredientById(id) {
    const ingredient = await getById(id);
    if(ingredient) return ingredient;
    else{  //if null was returned
        const error = new Error(`Ingredient ${id} not found`); //if recipe id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
}

//create an ingredient
export async function createIngredient(data) {
    return await create(data);
}

//update an ingredient
export async function updateIngredient(id, updatedData) {
    const updatedIngredient = await update(id, updatedData);
    if(updatedIngredient) return updatedIngredient;
    else{
        const error = new Error(`Ingredient ${id} not found`); //if recipe id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
    
}

//delete an ingredient
export async function deleteIngredient(id) {
    const deletedIngredient = await remove(id);
    if(deletedIngredient) return;
    else{
        const error = new Error(`Ingredient ${id} not found`); //if recipe id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
}