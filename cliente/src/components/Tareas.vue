<template>
    <div class="container mt-5">
        <h2>Lista de tareas</h2>
        <div class="mb-3">
            <button class="btn btn-success" @click="agregarForm">Agregar tarea</button>
        </div>
        <div class="modal fade" id="modalTarea" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{tareaId ? 'Actualizar Tarea': 'Agregar Tarea'}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="tareaId?editarTareaSubmit():addTarea()">
                            <div class="mb-3">
                                <label for="titulo" class="col-form-label">Título:</label>
                                <input type="text" class="form-control" id="titulo" v-model="titulo">
                            </div>
                            <div class="mb-3">
                                <label for="descripcion" class="col-form-label">Descripcion:</label>
                                <textarea class="form-control" id="descripcion" v-model="descripcion"></textarea>
                            </div>
                            <div v-if="tareaId">
                                <label for="estado" class="col-form-label">Estado:</label>
                                <select class="form-control" v-model="estado">
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Finalizado">Finalizado</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tarea in tareas" :key="tarea.Id">
                    <td>{{ tarea.Titulo }}</td>
                    <td>{{ tarea.Descripcion }}</td>
                    <td>{{ tarea.estado }}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" @click="editarTarea(tarea.Id)">Actualizar</button>
                        <button class="btn btn-danger btn-sm" @click="delTarea(tarea.Id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {tareaAPI} from '../services/axios';
    import { jwtDecode } from 'jwt-decode';
    import {Modal} from 'bootstrap';
    export default {
        data() {
            return {
                tareas: [],
                titulo: '',
                descripcion:'',
                estado: '',
                modalTarea: null,
                tareaId: null,
                usuarioId: null
            }
        },
        mounted(){
            const decodeTk = jwtDecode(localStorage.getItem('token'));
            this.usuarioId = decodeTk.id;
            this.obtenerTareas();
        },
        methods: {
            async obtenerTareas(){
                const respuesta = await tareaAPI.get('/tareas/'+this.usuarioId);
                this.tareas = respuesta.data;
            },
            async addTarea(){
                if(this.titulo.trim() === ''){
                    return;
                }
                const nuevaTarea = {
                    titulo: this.titulo,
                    descripcion: this.descripcion,
                    estado: 'Pendiente',
                    usuarioId: this.usuarioId
                };
                await tareaAPI.post('/crear', nuevaTarea);
                this.obtenerTareas();
                this.limpiarFormulario();
                this.hideModal();
            },
            async editarTarea(id){
                this.tareaId = id;
                const tarea = this.tareas.find(t=>t.Id===id);
                this.titulo = tarea.Titulo;
                this.descripcion = tarea.Descripcion;
                this.estado = tarea.estado;
                this.showModal();
            },
            async editarTareaSubmit(){
                const tareaActualizada ={
                    titulo: this.titulo,
                    descripcion: this.descripcion,
                    estado: this.estado
                };

                await tareaAPI.put('/actualizar/'+this.tareaId, tareaActualizada);
                this.obtenerTareas();
                this.limpiarFormulario();
                this.hideModal();
            },
            async delTarea(id){
                if(confirm('¿Esta seguro que desea eliminar esta tarea?')){
                    const respuesta= await tareaAPI.delete('/eliminar/'+id);
                    alert(respuesta.data.message);
                    this.obtenerTareas();
                }
            },
            agregarForm(){
                this.limpiarFormulario();
                this.showModal();
            },
            showModal(){
                this.modalTarea = new Modal(document.getElementById('modalTarea'));
                this.modalTarea.show();
            },
            hideModal(){
                this.modalTarea.hide();
            },
            limpiarFormulario() {
                this.titulo = '';
                this.descripcion = '',
                this.estado = '';
                this.tareaId = null;
            }
        }
    }
</script>