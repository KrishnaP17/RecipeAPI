//step 1 of the ingredient endpoint
import prisma from "../config/db.js";

//get all ingredients
export async function getAll({search, searchBy, sortBy, order, offset, limit}) {
    const conditions = {};

    if(search){
        conditions.OR = [
            {name : { contains: search, mode: "insensitive"}}, //case insensitive
            {category: {contains: search, mode: "insensitive"}}
        ]
    }
    const ingredients = await prisma.ingredient.findMany({
        where: conditions,
        orderBy: {
            [sortBy]: order
        },
        take: parseInt(limit),
        skip: parseInt(offset),
    }); 
    return ingredients;
}

//get an ingredient by id
export async function getById(id) {
    const ingredient = await prisma.ingredient.findUnique({where: {id}}); //findUnique returns null if the id doesn't exist, so no error to throw unlike the update and delete funcs
    return ingredient;
}

//create an ingredient
export async function create(data) {
    try{
        const newIngredient = await prisma.ingredient.create({data}); 
        return newIngredient;
    }
    catch(error){
        if(error.code === "P2002"){ //this is if the ingredient is already exists in the database
            const err = new Error("Ingredient already exists");
            err.status = 409;
            throw err;
        }
        throw error;
    }

}

//update an ingredient
export async function update(id, updatedData) {
    try{
        const updatedIngredient = await prisma.ingredient.update({where: {id}, data : updatedData}); 
        return updatedIngredient;
    }catch(error){
        if(error.code === "P2025") return null;  //this is if the id doesn't exist in the database
        if(error.code === "P2002"){ //this is if the ingredient is already exists in the database
            const err = new Error("Ingredient already exists");
            err.status = 409;
            throw err;
        }
        throw error;
    }

}

//delete an ingredient
export async function remove(id) {
    try{
        const deletedIngredient = await prisma.ingredient.delete({where: {id}}); //soft delete
        return deletedIngredient;
    } catch(error){
        if(error.code === "P2025") return null;  //this is if the id doesn't exist in the database
        throw error;
    }
}