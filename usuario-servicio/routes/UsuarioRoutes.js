const express = require('express');
const {crear, login} = require('../controllers/UsuarioController');
const router = express.Router();

router.post('/registro', crear);
router.post('/login', login);

module.exports = router;