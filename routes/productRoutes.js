const express = require('express');
const { getProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/productControllers');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');

router.get('/products', getProducts);
router.post('/products',  isAdmin, createProduct);
router.post('/products/:id', isAdmin,  deleteProduct);
router.post('/products/:id', isAdmin, updateProduct);

module.exports = router;