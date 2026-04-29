import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // existing data in correct order (junction tables first)
  await prisma.collectionRecipe.deleteMany();
  await prisma.recipeIngredient.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.user.deleteMany();

  // users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user1234', 10);

  const admin = await prisma.user.create({
    data: { email: 'admin@test.com', password: adminPassword, role: 'ADMIN' },
  });

  const user = await prisma.user.create({
    data: { email: 'user@test.com', password: userPassword, role: 'USER' },
  });

  // ingredients (created by authenticated users, managed by admin)
  const salt = await prisma.ingredient.create({
    data: { name: 'Salt', description: 'Common table salt', category: 'Spice' },
  });

  const pasta = await prisma.ingredient.create({
    data: { name: 'Pasta', description: 'Dried spaghetti pasta', category: 'Grain' },
  });

  const egg = await prisma.ingredient.create({
    data: { name: 'Egg', description: 'Large chicken egg', category: 'Dairy' },
  });

  const chicken = await prisma.ingredient.create({
    data: { name: 'Chicken Breast', description: 'Boneless skinless chicken breast', category: 'Meat' },
  });

  const rice = await prisma.ingredient.create({
    data: { name: 'Rice', description: 'Long grain white rice', category: 'Grain' },
  });

  // recipes (admin owns 1, regular user owns 2)
  const adminRecipe = await prisma.recipe.create({
    data: {
      title: 'Spaghetti Carbonara',
      instructions: 'Boil pasta. Fry pancetta. Mix eggs and cheese. Combine all together off heat.',
      prepTime: 30,
      difficulty: 'MEDIUM',
      authorId: admin.id,
    },
  });

  const userRecipe1 = await prisma.recipe.create({
    data: {
      title: 'Grilled Chicken',
      instructions: 'Season chicken with salt. Grill on medium heat for 6 minutes each side.',
      prepTime: 20,
      difficulty: 'EASY',
      authorId: user.id,
    },
  });

  const userRecipe2 = await prisma.recipe.create({
    data: {
      title: 'Egg Fried Rice',
      instructions: 'Cook rice. Scramble eggs in wok. Add rice and stir fry with soy sauce.',
      prepTime: 15,
      difficulty: 'EASY',
      authorId: user.id,
    },
  });

  // recipe ingredients
  await prisma.recipeIngredient.createMany({
    data: [
      { recipeId: adminRecipe.id, ingredientId: pasta.id, amount: 200, unit: 'g' },
      { recipeId: adminRecipe.id, ingredientId: egg.id, amount: 2, unit: 'whole' },
      { recipeId: adminRecipe.id, ingredientId: salt.id, amount: 1, unit: 'tsp' },
      { recipeId: userRecipe1.id, ingredientId: chicken.id, amount: 300, unit: 'g' },
      { recipeId: userRecipe1.id, ingredientId: salt.id, amount: 0.5, unit: 'tsp' },
      { recipeId: userRecipe2.id, ingredientId: rice.id, amount: 1, unit: 'cup' },
      { recipeId: userRecipe2.id, ingredientId: egg.id, amount: 2, unit: 'whole' },
    ],
  });

  // collections (each user owns their own)
  const adminCollection = await prisma.collection.create({
    data: {
      name: 'Admin Favorites',
      description: 'My favorite recipes',
      authorId: admin.id,
    },
  });

  const userCollection = await prisma.collection.create({
    data: {
      name: 'Quick Meals',
      description: 'Easy recipes for busy days',
      authorId: user.id,
    },
  });

  // collection recipes
  await prisma.collectionRecipe.createMany({
    data: [
      { collectionId: adminCollection.id, recipeId: adminRecipe.id },
      { collectionId: userCollection.id, recipeId: userRecipe1.id },
      { collectionId: userCollection.id, recipeId: userRecipe2.id },
    ],
  });

  console.log('Seeding complete!');
  console.log('Admin:  admin@test.com / admin123');
  console.log('User:   user@test.com  / user1234');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
