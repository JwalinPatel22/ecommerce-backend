const express = require('express');
const { registerUser, loginUser } = require('../controllers/authControllers');
const router = express.Router();


router.get('/', (req, res) => res.render("home"));
router.get('/login', (req, res) => res.render("login"));
router.get('/register', (req, res) => res.render("register"));
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;