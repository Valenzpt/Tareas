const { RetryAgent } = require('undici-types');
const Tarea = require('../models/TareaModel');

class TareaController {
    /**
     * Metodo para crear tareas
     * @param {*} req objeto de solicitud con datos de la tarea
     * @param {*} res objeto de respuesta
     * @returns tarea creada o error
     */
    static async crear(req, res){
        const {titulo, descripcion, usuario} = req.body;
        try {
            const tarea = await Tarea.create({
                Titulo: titulo,
                Descripcion: descripcion,
                UsuarioId: usuario,
                estado: 'pendiente'
            });
            return res.status(200).json({message: 'Tarea creada con exito', tarea});
        } catch (error) {
            return res.status(500).json({error: 'Error al crear tarea'});
        }
    }
    /**
     * Metodo para actualizar una tarea 
     * @param {*} req objeto de solicitud con datos para actualizar
     * @param {*} res objeto de respuesta
     * @returns tarea actualizada
     */
    static async actualizar(req, res){
        const {id} = req.params;
        const {titulo, descripcion, estado} = req.body;
        try {
            const tarea = await Tarea.findByPk(id);
            if(!tarea) return res.status(404).json({error: 'Tarea no encontrada'});

            tarea.Titulo = titulo;
            tarea.Descripcion = descripcion;
            tarea.estado = estado;
            await tarea.save();
            return res.status(200).json({message: 'Tarea actualizada', tarea});
        } catch (error) {
            return res.status(500).json({error: 'Error al actualizar la tarea'});
        }
    }
    /**
     * Metodo para eliminar una tarea 
     * @param {*} req parametro de busqueda para eliminar
     * @param {*} res objeto de respuesta
     * @returns mensaje de tarea eliminada o error
     */
    static async eliminar(req, res){
        const {id} = req.params;
        try {
            const tarea = await Tarea.findByPk(id);
            if(!tarea) return res.status(404).json({error: 'Tarea no encontrada'});
            await tarea.destroy();
            return res.status(200).json({message: 'Tarea eliminada'});
        } catch (error) {
            return res.status(500).json({error: 'Error al eliminar la tarea'});
        }
    }
    /**
     * listar todas las tareas de un usuario
     * @param {*} req parametro de solicitud para listar
     * @param {*} res objeto de respuesta
     * @returns objeto con listado de tareas del usuario o error
     */
    static async listar(req, res){
        const {id} = req.params;
        try {
            const tareas = await Tarea.findAll({where: {UsuarioId: id}});
            return res.status(200).json({tareas});
        } catch (error) {
            return res.status(500).json({error: 'Error al obtener tareas'});
        }
    }
}

module.exports = TareaController;