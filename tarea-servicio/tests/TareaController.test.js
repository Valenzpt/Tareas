const request = require('supertest');
const app = require('../app');
const sequelize = require('../../compartido/dbconfig');

beforeAll(async()=>{
    await sequelize.sync({force: true});
});

afterAll(async()=>{
    await sequelize.close();
});

describe('Controlador tarea', async()=>{
    it('Deberia crear una tarea', async()=>{
        const response = await request(app).post('/api/tarea/crear').send({
            titulo: 'Tarea prueba',
            descripcion: 'Descripcion de la prueba tarea',
            usuario: 1
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('Id');
    });

    it('Deberia actualizar una tarea', async()=>{
        const response = await request(app).put('/api/tarea/actualizar/1').send({
            titulo: 'Tarea prueba actualizada',
            descripcion: 'Descripcion de la prueba tarea actualizada',
            usuario: 1,
            estado: 'Finalizado'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('Titulo', 'Tarea prueba actualizada');
    });

    it('Deberia eliminar una tarea', async()=>{
        const response = await request(app).delete('/api/tarea/eliminar/1');
        expect(response.statusCode).toBe(200);
    });    
    it('Deberia listar las tareas de un usuario', async()=>{
        const response = await request(app).get('/api/tarea/tareas/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('tareas');
    });    
})