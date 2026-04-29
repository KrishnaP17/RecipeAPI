//step 3 of collection endpoint

import { getAllCollections, getCollectionById, createCollection, updateCollection, deleteCollection } from "../services/collectionService.js";

//get all collections made by the user only
export async function getAllCollectionsHandler(req, res) {
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

    let collections = await getAllCollections(req.user.id, options);
    res.status(200).json(collections);

}

//get collection by id
export async function getCollectionByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const collection = await getCollectionById(id);
    return res.status(200).json(collection);
}

//create a collection
export async function createCollectionHandler(req, res){
    const {name, description} = req.body;
    const newCollection = await createCollection({name, description, authorId: req.user.id});
    return res.status(201).json(newCollection);
}

//update a collection
export async function updateCollectionHandler(req, res){
    const id = parseInt(req.params.id);
    const {name, description} = req.body;
    const updatedCollection = await updateCollection(id, {name, description});
    return res.status(200).json(updatedCollection);
}

//delete a collection
export async function deleteCollectionHandler(req, res){
    const id = parseInt(req.params.id);
    await deleteCollection(id);
    return res.status(204).send();
}