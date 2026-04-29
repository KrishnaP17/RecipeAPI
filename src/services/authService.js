//STEP 2 OF AUTH ENDPOINT
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../repositories/userRepo.js";

//sign up
export async function signUp(email, password, role){
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {email, password: hashedPassword}
    if(role) data.role = role;
    const newUser = await createUser(data);
    return newUser;
}

//log in
export async function logIn(email, password){
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

    const error = new Error("Invalid credentials");
    error.status = 401;

    const user = await findUserByEmail(email);
    if(!user) throw error;  //if user doesn't exist, show invalid credentials error

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw error; //if password doesn't match, show invalid credentials error

    const accessToken = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    return accessToken;

}