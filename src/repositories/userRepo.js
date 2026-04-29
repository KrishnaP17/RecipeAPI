//STEP 1 OF AUTH ENDPOINT 

import prisma from "../config/db.js";

export async function createUser(data) {
    try{
        const newUser = await prisma.user.create({
            data: data,
            omit: { password: true }
        });
        return newUser;
    }
    catch(error){
        if(error.code === "P2002"){
            const err = new Error("Email already in use");
            err.status = 409;
            throw err;
        }
        throw error;
    }
    
}

export async function findUserByEmail(email){
    return prisma.user.findUnique({where: {email: email}});
}

