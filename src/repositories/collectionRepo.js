//Step 1 of collection endpoint
import prisma from "../config/db.js";

//get all collections that are owned by the user only
export async function getAll(userId, {search, sortBy, order, offset, limit}) {
    const conditions = {authorId: userId};

    if(search) {
        conditions.OR = [
            {name : { contains: search, mode: "insensitive"}}, //case insensitive
        ]
    }

    const collections = await prisma.collection.findMany({
        where: conditions,
        orderBy: {
            [sortBy]: order
        },
        take: parseInt(limit),
        skip: parseInt(offset),
    }); 
    return collections;

}

//get a recipe by it's id, but the one that belongs to the user only
//for now, we find by id only, then it can return null if not found. Then the ownership check will run in the service layer so we can distinguish between the 403 Forbidden: Logged in but not the owner of the collection, and  404 Not Found: collection with that ID doesn't exist errors
//flow: authenticate (confirms logged in), handler runs (fetches collection -> checks 404 id not found, then 403 if the owner or not), then service layer checks ownership
//we do this becasue middleware functions run before the service/repo, so it doesn't have the collection object yet to check ownershuo against. 
export async function getById(id) {
    const collection = await prisma.collection.findUnique({where: {id}}); //findUnique returns null if the id doesn't exist, so no error to throw unlike the update and delete funcs
    return collection;
}

//create a collection (authenticate later in the path)
export async function create(data){
    try{
        const collection = await prisma.collection.create({data});
        return collection;
    } catch(error){
        if(error.code === "P2002"){
            const err = new Error(`Collection with this name already exists`);
            err.status = 409;
            throw err;
        }
        throw error;
    }

}

//update a collection (make sure to authorize later in the path)
export async function update(id, updatedData){
    try{
        const collection = await prisma.collection.update({where: {id}, data: updatedData}); //this will throw an error if the id doesn't exist
        return collection;
    } catch(error){
        if(error.code === "P2025"){
            return null;
        }
        if(error.code === "P2002"){
            const err = new Error(`Collection with this name already exists`);
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

//remove a collection (make sure to authorize later in the path)
export async function remove(id){
    try{
        const collection = await prisma.collection.delete({where: {id}}); //this will throw an error if the id doesn't exist
        return collection;
    } catch(error){
        if(error.code === "P2025"){
            return null;
        }
        throw error;
    }
}