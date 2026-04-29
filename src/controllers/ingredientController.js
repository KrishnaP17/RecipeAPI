//step 3 of the ingredient endpoint
import { getAllIngredients, getIngredientById, createIngredient, updateIngredient,deleteIngredient } from "../services/ingredientService.js";

//get all ingredients
export async function getAllIngredientsHandler(req, res){
    const{
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
    
    let ingredients = await getAllIngredients(options);
    return res.status(200).json(ingredients);
}

//get an ingredient by id
export async function getIngredientByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const ingredient = await getIngredientById(id);
    return res.status(200).json(ingredient);
}

//create an ingredient
export async function createIngredientHandler(req, res){
    const {name, description, category} = req.body;
    const newIngredient = await createIngredient({name, description, category});
    return res.status(201).json(newIngredient);
}

//update an ingredient
export async function updateIngredientHandler(req, res){
    const id = parseInt(req.params.id);
    const {name, description, category} = req.body;
    const updatedIngredient = await updateIngredient(id, {name, description, category});
    return res.status(200).json(updatedIngredient);
}

//delete an ingredient
export async function deleteIngredientHandler(req, res){
    const id = parseInt(req.params.id);
    const deletedIngredient = await deleteIngredient(id);
    return res.status(204).send();
}