import { getByRecipeId, add, remove } from '../repositories/recipeIngredientRepo.js';
import { getRecipeById } from './recipeService.js';
import { getIngredientById } from './ingredientService.js';

export async function getRecipeIngredients(recipeId) {
  return getByRecipeId(recipeId);
}

export async function addIngredientToRecipe(recipeId, ingredientId, amount, unit) {
  await getRecipeById(recipeId);
  await getIngredientById(ingredientId);
  return add(recipeId, ingredientId, amount, unit);
}

export async function removeIngredientFromRecipe(recipeId, ingredientId) {
  const result = await remove(recipeId, ingredientId);
  if (!result) {
    const error = new Error('Ingredient not found in this recipe');
    error.status = 404;
    throw error;
  }
}