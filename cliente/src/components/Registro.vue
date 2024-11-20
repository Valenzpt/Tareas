<template>
    <div class="container mt-5">
        <h2>Registro de usuario</h2>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" v-model="nombre" required>
            </div>
            <div class="mb-3">
                <label for="correo" class="form-label">Correo</label>
                <input type="email" class="form-control" id="correo" v-model="correo" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </div>
</template>

<script>
    import {usuarioAPI} from '../services/axios';

    export default {
        data() {
            return {
                nombre: '',
                correo: '',
                password: ''
            }
        },
        methods: {
            async handleSubmit(){
                try {
                    const respuesta = await usuarioAPI.post('/registro', {
                        correo: this.correo, 
                        nombre: this.nombre, 
                        password: this.password
                    });
                    this.$router.push('/login');
                    alert(respuesta.data.message);
                } catch (error) {
                    console.log('error al registrar usuario');
                }
                
            }
        }
    }
</script>