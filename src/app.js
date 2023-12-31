import express from 'express';
import fs from 'fs-extra';
import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager('./src/products.json');

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts();

  if (isNaN(limit)) {
    res.json(products);
  } else {
    res.json(products.slice(0, limit));
  }
});

app.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productManager.getProductById(id);

  if (product === "Not Found") {
    res.status(404).json({ error: "Product not found" });
  } else {
    res.json(product);
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});