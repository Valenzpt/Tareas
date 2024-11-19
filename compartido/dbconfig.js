const {Sequelize} = require('sequelize');

//configuracion de conexion a la base de datos
const sequelize = new Sequelize('TareasUsuarios', 'valentinaz', 'Val12345', {
    host: 'localhost',
    dialect: 'mssql',
    logging: console.log,
});

//conexion
try {
    sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente');
} catch (error) {
    console.error('No se pudo conectar a la base de datos: ', error);
}