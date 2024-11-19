const express = require('express');
const usuarioRutas = require('./routes/UsuarioRoutes');

const app = express();

app.use(express.json());
app.use('/api/usuario', usuarioRutas);

app.listen(3000, ()=> console.log('Servicio usuario corriendo en el puerto 3000'));