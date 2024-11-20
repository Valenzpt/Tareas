const {DataTypes, Model} = require('sequelize');
const db = require('../../compartido/dbconfig');
const bcrypt = require('bcryptjs');
class Usuario extends Model {
    /**
     * Metodo para encontrar un usuario por su correo
     * @param {*} correo parametro de busqueda
     * @returns usuario encontrado o null si no existe
     */
    static async findByEmail(correo){
        return await Usuario.findOne({where: {Correo: correo}});
    };
    /**
     * Metodo para hashear la contraseña del usuario antes de guardar
     */
    async hashPassword(){
        this.Password = await bcrypt.hash(this.Password, 10);
    };
    /**
     * Metodo para validar la contraseña comparando la contraseña ingresada con el hash de la bd
     * @param {*} password contraseña ingresada para comparar
     * @returns true si la contraseña es valida
     */
    async validatePassword(password){
        return await bcrypt.compare(password, this.Password);
    }

    /**
     * Metodo estatico de autenticacion para validar usuario y contraseña
     * @param {*} correo correo del usuario ingresado para validar
     * @param {*} password contraseña del usuario ingresada para validar
     */
    static async autenticacion(correo, password){
        const usuario = await this.findByEmail(correo);
        if(!usuario) return null;
        const validPassword = await usuario.validatePassword(password);
        return validPassword?usuario:null;
    }
}

//definicion del modelo usuario(campos y configuraciones)
Usuario.init({
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: DataTypes.STRING,
    Correo: DataTypes.STRING,
    Password: DataTypes.STRING
},{
    sequelize: db,
    tableName: 'Usuarios',
    timestamps: false
});

//hash contraseña antes de crear el usuario
Usuario.beforeCreate(async (usuario)=>{
    await usuario.hashPassword();
});

/* Usuario.hasMany(Tarea, {
    foreignKey: 'UsuarioId',
    as: 'tareas'
}); */
module.exports = Usuario;