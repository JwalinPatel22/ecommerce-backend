const express = require('express');
const { getAllUsers, registerUser, loginUser } = require('../controllers/userControllers');
const router = express.Router();


router.get('/', (req, res) => res.render("home"));
router.get('/login', (req, res) => res.render("login"));
router.get('/register', (req, res) => res.render("register"));

router.get('/allUsers', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;