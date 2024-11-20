const {DataTypes, Model} = require('sequelize');
const db = require('../../compartido/dbconfig');
class Tarea extends Model {
}

Tarea.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Titulo: DataTypes.STRING,
    Descripcion: DataTypes.STRING,
    estado: DataTypes.STRING,
    UsuarioId: DataTypes.INTEGER,
        
},{
    sequelize: db,
    tableName: 'Tareas',
    timestamps: false
});

module.exports = Tarea;