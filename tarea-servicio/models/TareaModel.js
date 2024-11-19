const {DataTypes, Model} = require('sequelize');
const db = require('../../compartido/dbconfig');
const Usuario = require('../../usuario-servicio/models/UsuarioModel');
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
    UsuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'Id',
        },
        onDelete: 'CASCADE'
    }
},{
    sequelize: db,
    tableName: 'Tareas',
    timeStamps: false
});

Tarea.belongsTo(Usuario, {
    foreignKey: 'UsuarioId',
    as: 'usuario'
});
module.exports = Tarea;