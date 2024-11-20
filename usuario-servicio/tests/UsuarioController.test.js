const request = require('supertest');
const app = require('../app');
const sequelize = require('../../compartido/dbconfig');
const { describe } = require('../models/UsuarioModel');

beforeAll(async()=>{
    await sequelize.sync({force: true});
});

afterAll(async()=>{
    await sequelize.close();
});

describe('Controlador usuarios', ()=>{
    it('Deberia registrar un usuario', async()=>{
        const response = await request(app).post('/api/usuario/registro').send({
            nombre: 'Valentina prueba',
            correo: 'valentina@prueba.com',
            password: '12345',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    it('Deberia autenticar un usuario', async()=>{
        const response = await request(app).post('/api/usuario/login').send({
            correo: 'valentina@prueba.com',
            password: '12345',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
})