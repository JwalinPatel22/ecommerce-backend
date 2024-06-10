const express = require('express');
const cartController = require('../controllers/cartControllers');
const router = express.Router();

router.get('/', cartController.getCart);
// router.get('/add', (req,res) => res.render('cart'));
router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);

module.exports = router;