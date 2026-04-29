//COLLECTION-RECIPES ENDPOINT

import prisma from "../config/db.js";

//get all recipes in a collection by its collection id
export async function getByCollectionId(collectionId) {
  return prisma.collectionRecipe.findMany({
    where: { collectionId },
    include: { recipe: true },
    //include: { recipe: true } means Prisma joins the related table so you get the full object back, not just the ids

  });
}

//add a recipe to a collection
export async function add(collectionId, recipeId) {
  try {
    return await prisma.collectionRecipe.create({
      data: { collectionId, recipeId },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Recipe already exists in this collection');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

//remove a recipe from a collection
export async function remove(collectionId, recipeId) {
  try {
    return await prisma.collectionRecipe.delete({
      where: { collectionId_recipeId: { collectionId, recipeId } },
      //collectionId_recipeId are Prisma's composite key syntax for deleting from junction tables
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
