//Step 3 of recipe endpoint


import { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } from "../services/recipeService.js";

//get all recipe
export async function getAllRecipesHandler(req, res){
    const {
        search = '',
        sortBy = 'id',
        order = 'asc',
        offset = 0,
        limit = 10
    } = req.query;

    const options = {
        search,
        sortBy,
        order,
        offset,
        limit
    };
    
    let recipes = await getAllRecipes(options);
    return res.status(200).json(recipes);

}

//get recipe by id 
export async function getRecipeByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const recipe = await getRecipeById(id);
    return res.status(200).json(recipe);
}

//create a recipe
export async function createRecipeHandler(req, res){
    const {title, instructions, prepTime, difficulty} = req.body;
    const newRecipe = await createRecipe({title, instructions, prepTime, difficulty, authorId: req.user.id});
    return res.status(201).json(newRecipe);
}

//update a recipe
export async function updateRecipeHandler(req, res){
    const id = parseInt(req.params.id);
    const {title, instructions, prepTime, difficulty} = req.body;
    const updatedRecipe = await updateRecipe(id, {title, instructions, prepTime, difficulty});
    return res.status(200).json(updatedRecipe);
}

//delete a recipe
export async function deleteRecipeHandler(req, res){
    const id = parseInt(req.params.id);
    const deletedRecipe = await deleteRecipe(id);
    return res.status(204).send();
}