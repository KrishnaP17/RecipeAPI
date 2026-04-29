//step 2 of collection endpoint
import { getAll, getById, create, update, remove } from "../repositories/collectionRepo.js";

//get all collections made by the user only
export async function getAllCollections(userId, options) {
    return await getAll(userId, options);
}

//get a collection by it's id, but the one that belongs to the user only
//when the repo queries the db, it queries the ENTIRE db, regardless of who owns the collection.
//The ownership check for getById doesn't happen in the repo, it happens in the authorizeOwnership middleware
export async function getCollectionById(id) {
    const collection = await getById(id);
    if(!collection){  //if null was returned
        const error = new Error(`Collection ${id} not found`); //if collection id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
    return collection;
}

//create a collection
export async function createCollection(data){
    const newCollection = await create(data);
    return newCollection;
}

//update a collection
export async function updateCollection(id, updatedData){
    const updatedCollection = await update(id, updatedData);
    if(updatedCollection) return updatedCollection;
    else{  //if null was returned
        const error = new Error(`Collection ${id} not found`); //if collection id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
}

//delete a collection
export async function deleteCollection(id){
    const deletedCollection = await remove(id);
    if(deletedCollection) return;
    else{
        const error = new Error(`Collection ${id} not found`); //if collection id doesn't exist, meaning if the repo function retuns null
        error.status = 404;
        throw error;
    }
}