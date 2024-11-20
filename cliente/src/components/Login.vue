<template>
    <div class="container mt-5">
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="handleLogin">
            <div class="mb-3">
                <label for="correo" class="form-label">Correo</label>
                <input type="email" class="form-control" id="correo" v-model="correo" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Iniciar sesión</button>
        </form>
        <div class="mt-3">
            <router-link to="/registro">¿No tienes cuenta? Regístrate aquí</router-link>
        </div>
    </div>
</template>

<script>
    import {usuarioAPI} from '../services/axios';

    export default {
        data() {
            return {
                correo: '',
                password: ''
            }
        },
        methods: {
            async handleLogin(){
                try {
                    const respuesta = await usuarioAPI.post('/login', {
                        correo: this.correo, 
                        password: this.password
                    });
                    alert(respuesta.data.message);
                    localStorage.setItem('token', respuesta.data.token);
                    this.$router.push('/tareas');
                } catch (error) {
                    console.log('error al iniciar sesión');
                }
                
            }
        }
    }
</script>