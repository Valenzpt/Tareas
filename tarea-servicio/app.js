const express = require('express');
const cors = require('cors');
const tareaRutas = require('./routes/TareaRoutes');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/tarea', tareaRutas);

app.listen(3001, ()=> console.log('Servicio usuario corriendo en el puerto 3001'));