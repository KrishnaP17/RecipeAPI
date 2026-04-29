import { getRecipeIngredients, addIngredientToRecipe, removeIngredientFromRecipe } from '../services/recipeIngredientService.js';

export async function getRecipeIngredientsHandler(req, res) {
  const recipeId = parseInt(req.params.id);
  const ingredients = await getRecipeIngredients(recipeId);
  res.status(200).json(ingredients);
}

export async function addIngredientToRecipeHandler(req, res) {
  const recipeId = parseInt(req.params.id);
  const { ingredientId, amount, unit } = req.body;
  const result = await addIngredientToRecipe(recipeId, parseInt(ingredientId), amount, unit);
  res.status(201).json(result);
}

export async function removeIngredientFromRecipeHandler(req, res) {
  const recipeId = parseInt(req.params.id);
  const ingredientId = parseInt(req.params.ingredientId);
  await removeIngredientFromRecipe(recipeId, ingredientId);
  res.status(204).send();
}
