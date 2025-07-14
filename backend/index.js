const express = require('express');
const cors = require('cors');
const app = express();

const productsRouter = require('./routes/products.routes');
const producersRoutes = require('./routes/producers.routes');

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/producers', producersRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

