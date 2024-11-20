const Usuario = require('../models/UsuarioModel');
const jwt = require('jsonwebtoken');
const JWTSECRET = 'claveSuperSecreta12345'; //:X

class UsuarioController {
    /**
     * Controlador para crear un usuario si no existe
     * @param {*} req contiene el objeto de la solicitud con los datos del usuario
     * @param {*} res objeto de respuestqa
     * @returns usuario creado o error segun el caso
     */
    static async crear(req, res){
        const {correo, nombre, password} = req.body;
        try {
            const encontrar = await Usuario.findByEmail(correo);
            if(encontrar) return res.status(409).json({error: 'Usuario ya existe'});
            
            const nuevo = await Usuario.create({
                Correo: correo,
                Nombre: nombre,
                Password: password
            });
            return res.status(200).json({message: 'Usuario creado correctamente', usuario: nuevo});
        } catch (error) {
            return res.status(500).json({error: 'Error al crear usuario'});
        }
    }

    static async login(req, res) {
        try {
            const {correo, password} = req.body;
            const usuario = await Usuario.autenticacion(correo, password);
            if(!usuario) return res.status(401).json({error: 'Credenciales incorrectas'});
            const token = jwt.sign({id: usuario.Id, correo: usuario.Correo}, JWTSECRET, {expiresIn: '2h'});
            return res.status(200).json({message: 'Sesión iniciada', token});
        } catch (error) {
            return res.status(500).json({error: 'Error al iniciar sesión'});
        }
    }
}

module.exports = UsuarioController;