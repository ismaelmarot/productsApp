const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db/database');
const createProductsTable = require('./db/tables/products.table');
const createProducersTable = require('./db/tables/producers.table');
const createCategoriesTable = require('./db/tables/categories.table');

const productsRouter = require('./routes/products.routes');
const producersRouter = require('./routes/producers.routes');
const categoriesRouter = require('./routes/categories.routes');

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/producers', producersRouter);
app.use('/api/categories', categoriesRouter);

// Create Tables
createProductsTable(db);
createProducersTable(db);
createCategoriesTable(db);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
