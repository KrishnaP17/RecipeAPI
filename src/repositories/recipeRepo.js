//Step 1 of recipe endpoint

import prisma from "../config/db.js";

//get all recipes
export async function getAll({search, sortBy, order, offset, limit}){
    const conditions = {};

    if(search){
        conditions.OR = [
            {title : { contains: search, mode: "insensitive"}}, //case insensitive
            {difficulty: {contains: search, mode: "insensitive"}},
            {prepTime: {contains: search, mode: "insensitive"}}

        ];
    }

    const recipes = await prisma.recipe.findMany({
        where: conditions,
        orderBy: {
            [sortBy]: order
        },
        take: parseInt(limit),
        skip: parseInt(offset),
    });
    return recipes;
        
}

//get a recipe by id
export async function getById(id){
    const recipe = await prisma.recipe.findUnique(
        { where : {id} }
    );
    return recipe;
}

//create a recipe
export async function create(data){
    const recipe = await prisma.recipe.create({data});
    return recipe;
}

//update a recipe
export async function update(id, updatedData){
    try{
        const recipe = await prisma.recipe.update({where: {id}, data : updatedData});
        return recipe;
    }catch(error){
        if(error.code === "P2025") return null;  //id doesnt exist
        throw error;
    }
}

//remove a recipe
export async function remove(id){
    try{
        const deleteRecipe = await prisma.recipe.delete({where: {id}}); //soft delete
        return deleteRecipe;
    } catch(error){
        if(error.code === "P2025") return null;
        throw error;
    }
}



