<script setup>
import { ref, onMounted } from 'vue'
import { getDataChangedCollection, saveDataDoc, deleteField } from '@/crudFirebase'


const elementos = ref([])
const botonSE = ref(false)

const mostrarBoton = () => {
    botonSE.value = true
}

const cancelar = () => {
    botonSE.value = false
}

const nuevoValor = (nombre, valor) =>   {
    return {
        [nombre]: valor,
    }
}

// Mostramos los detalles de la sala
const mostrar = async () => {
    try {
        await getDataChangedCollection('salas', (snapshot) => {
            elementos.value = snapshot.docs.map((el) => ({ id: el.id, ...el.data() }))
        })
    } catch (error) {
        console.error('Error al obtener datos:', error)
    }
}

//guardar los cambios realizados en la sala
const guardarDatos = async(id, obj) => {
    try {
        await saveDataDoc(id, obj)
        botonSE.value = false
    } catch (error) {
        console.log('Datos guardados correctamente')
    }


}

//borramos un elemento del div
const borrarEl = async(id, valor) => {
    try {
        await deleteField(id, valor);
    } catch (error) {
        console.log(error);
    }
}


onMounted(mostrar)
</script>

<template>
    <div>
        <h1>Sala de Visualización</h1>
        <p>Aquí puedes añadir y ver el estado de tus dispositivos.</p>
        <div class="cajas-container">
            <div v-for="sala in elementos" :key="sala.id" class="caja">
                <div v-for="(value, key) in sala" :key="key" class="dato">
                    {{ key }}: {{ value }}
                    <template v-if="key !== 'id'">
                        <button @click="borrarEl(sala.id, key)">Borrar</button>
                    </template>
                </div>
                <button @click="mostrarBoton">+ Sensor</button> |
                <button @click="mostrarBoton">+ Ejecutor</button>
                <div v-if="botonSE">
                    <input type="text" v-model="nombre" placeholder="Nombre dispositivo">
                    <input type="number" v-model="valor" placeholder="Valor dispositivo">
                    <button @click="guardarDatos(sala.id, nuevoValor(nombre, valor))">Aceptar</button>
                    <button @click="cancelar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.cajas-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
}

.caja {
    padding: 10px;
    box-shadow: 1px 1px 1px 1px black;
    flex: 0 0 calc(20% - 10px);
    margin-bottom: 10px;
    min-width: 120px;
    box-sizing: border-box;
}

.caja:hover {
    background-color: aliceblue;
}

.dato {
    margin-bottom: 5px;
    font-size: 12px;
}
</style>