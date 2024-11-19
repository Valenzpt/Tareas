const express = require('express');
const {crear, actualizar, eliminar, listar} = require('../controllers/tareaController');
const router = express.Router();

router.post('/crear', crear);
router.put('/actualizar/:id', actualizar);
router.delete('/eliminar/:id', eliminar);
router.get('/tareas/:id', listar);

module.exports = router;

