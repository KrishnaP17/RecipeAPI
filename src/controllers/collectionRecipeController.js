import { getCollectionRecipes, addRecipeToCollection, removeRecipeFromCollection } from '../services/collectionRecipeService.js';

export async function getCollectionRecipesHandler(req, res) {
  const collectionId = parseInt(req.params.id);
  const recipes = await getCollectionRecipes(collectionId);
  res.status(200).json(recipes);
}

export async function addRecipeToCollectionHandler(req, res) {
  const collectionId = parseInt(req.params.id);
  const { recipeId } = req.body;
  const result = await addRecipeToCollection(collectionId, parseInt(recipeId));
  res.status(201).json(result);
}

export async function removeRecipeFromCollectionHandler(req, res) {
  const collectionId = parseInt(req.params.id);
  const recipeId = parseInt(req.params.recipeId);
  await removeRecipeFromCollection(collectionId, recipeId);
  res.status(204).send();
}
