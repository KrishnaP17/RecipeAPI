//RECIPE-INGREDIENT
import prisma from "../config/db.js";

//get all ingredients in a recipe by its recipe id
export async function getByRecipeId(recipeId){
    const recipeIngredients = await prisma.recipeIngredient.findMany({
        where: {recipeId},
        include: {ingredient: true}
        //include: { ingredient: true } means Prisma joins the related table so you get the full object back, not just the ids
    });
    return recipeIngredients;
}

//add an ingredient to a recipe 
export async function add(recipeId, ingredientId, amount, unit){
    try{
        const recipeIngredient = await prisma.recipeIngredient.create({data: {recipeId, ingredientId, amount, unit}}); //amount and unit are optional
        return recipeIngredient;
    }catch(error){
        //if ingredient already exists in recipe, throw error
        if(error.code === "P2002"){
            const err = new Error("Ingredient already exists in recipe");
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

//remove an ingredient from a recipe
export async function remove(recipeId, ingredientId){
    try{
        const recipeIngredient = await prisma.recipeIngredient.delete({where: {recipeId_ingredientId: { recipeId, ingredientId }}}); //this will throw an error if the id doesn't exist
        //recipeId_ingredientId are Prisma's composite key syntax for deleting from junction tables
        return recipeIngredient;
    } catch(error){
        if(error.code === "P2025") return null;  //id doesnt exist
        throw error;
    }
}