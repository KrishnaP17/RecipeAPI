//final step for all endpoints

import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
if(process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

//read specification of yaml
let specs;
try{
  specs = YAML.load(fs.readFileSync('./docs/openapi.yaml', 'utf8'));
}catch(e){
  console.log("Failed to load OpenAPI specification", e);
  //stop server b/c errors like these should be stopped before server starts
  process.exit(1);
}
//mount swaggerui to api endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/collections', collectionRoutes);


//404 handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error.stack);
  if(!error.status){
    error.status = 500;
    error.message = 'Internal Server Error';
  }
  res.status(error.status).json({ error: error.message });
});

//port error
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;

