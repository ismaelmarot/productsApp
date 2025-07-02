const express = require('express');
const cors = require('cors');
const app = express();

const productsRouter = require('./routes/products');

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

