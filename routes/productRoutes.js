const express = require('express');
const { getProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/productControllers');
const router = express.Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.post('/products/:id', deleteProduct);
router.post('/products/:id', updateProduct);

module.exports = router;