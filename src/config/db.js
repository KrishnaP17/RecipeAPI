//This db.js file is used to connect to the database
//instead of every file creating its own connection (which gets messy), you create it once here and reuse it everywhere

//PrismaClient → the thing you actually use to run queries (like “find users”, “create recipe”)
import { Prisma, PrismaClient } from '../generated/prisma/client.ts';

//This is what connects Prisma to PostgresSQL specifically
import { PrismaPg } from '@prisma/adapter-pg';

//prisma = universal remote 
//adapter = tells remote how to talk to a specific TV (PostgresSQL in this case)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

//this creates the database client instance
const prisma = new PrismaClient({ adapter });

export default prisma;




//now you can use queries like this everywhere:
    //prisma.users.findMany({}), etc