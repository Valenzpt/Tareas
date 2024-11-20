const express = require('express');
const cors = require('cors');
const usuarioRutas = require('./routes/UsuarioRoutes');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/usuario', usuarioRutas);

app.listen(3000, ()=> console.log('Servicio usuario corriendo en el puerto 3000'));