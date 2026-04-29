import { getByCollectionId, add, remove } from '../repositories/collectionRecipeRepo.js';
import { getCollectionById } from './collectionService.js';
import { getRecipeById } from './recipeService.js';

export async function getCollectionRecipes(collectionId) {
  return getByCollectionId(collectionId);
}

export async function addRecipeToCollection(collectionId, recipeId) {
  await getCollectionById(collectionId);
  await getRecipeById(recipeId);
  return add(collectionId, recipeId);
}

export async function removeRecipeFromCollection(collectionId, recipeId) {
  const result = await remove(collectionId, recipeId);
  if (!result) {
    const error = new Error('Recipe not found in this collection');
    error.status = 404;
    throw error;
  }
}
