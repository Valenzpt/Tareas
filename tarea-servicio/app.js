const express = require('express');
const tareaRutas = require('./routes/TareaRoutes');

const app = express();

app.use(express.json());
app.use('/api/tarea', tareaRutas);

app.listen(3000, ()=> console.log('Servicio usuario corriendo en el puerto 3000'));