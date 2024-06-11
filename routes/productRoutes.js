const express = require('express');
const { getAllProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/productControllers');
const router = express.Router();

router.get('/products', getAllProducts);
router.post('/product', createProduct);
router.delete('/product/:id',  deleteProduct);
router.patch('/product/:id' , updateProduct);

module.exports = router;