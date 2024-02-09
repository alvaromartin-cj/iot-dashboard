<script setup>
import { ref } from 'vue';
import { createDocument } from '@/crudFirebase';

// const mostrarValor = () => {
//     console.log(nuevoDocumento.value.idSala);
//     console.log(nuevoDocumento.value.elementos);
// }

const sensores = ref('');
const ejecutores = ref('');
const valor = ref('');

const nuevoDocumento = ref({
    idSala: '',
    elementos: {}
});

const agregarElemento = (nombre, valor) => {
    nuevoDocumento.value.elementos[nombre] = valor;
};

const anadirSala = async (doc) => {
    try {
        await createDocument(doc.idSala, doc.elementos);
    } catch (error) {
        console.error('Error al actualizar el valor:', error);
    }
};

const divSala = ref({
    nombreSala: false
});

const sala = () => {
    divSala.value.nombreSala = true;
};

const divSensor = ref({
    sensor: false
});

const divEjecutor = ref({
    ejecutor: false
});

//mostrar los elementos según el tipo que sean
const mostrar = (el) => {
    if (el === 's') {
        divSensor.value.sensor = true;
        divEjecutor.value.ejecutor = false;
    } else if (el === 'r') {
        divEjecutor.value.ejecutor = true;
        divSensor.value.sensor = false;
    } else {
        divSensor.value.sensor = false;
        divEjecutor.value.ejecutor = false;
    }
};
</script>

<template>
    <div>
        <h2 class="display-4">Espacio para modificar la DOMÓTICA</h2>

        <button @click="sala" class="btn btn-primary btn-lg">Añadir sala</button>
        <router-link :to="{ name: 'paginaPrincipal' }">  
        <button @click="anadirSala(nuevoDocumento)" v-if="nuevoDocumento.idSala !== ''" class="btn btn-primary btn-lg" style="margin-left: 10px;">Guardar sala</button>
        </router-link>
        <div v-if="divSala.nombreSala" class="sala">
              <input type="text" v-model="nuevoDocumento.idSala" class="form-control input mb-3" placeholder="Nombre de la nueva sala">
            <h5 class="h5">¿Quieres añadir elementos?</h5>
            <button @click="mostrar('s')" class="btn btn-secondary btn-lg">Sensor</button>
            <button @click="mostrar('r')" class="btn btn-secondary btn-lg">Ejecutor</button>
        </div>

        <div v-if="divSensor.sensor" class="sensor card p-3" style="border: 1px solid black;">
    <h3>Tipos de sensores: </h3>
    <select class="form-select mb-3" v-model="sensores">
        <option value="temperatura">Sensor de temperatura</option>
        <option value="humedad">Sensor de humedad</option>
        <option value="luz">Sensor de luz</option>
    </select>
    <h3>Valor inicial:</h3>
    <div v-if="sensores === 'luz'">
        <input type="radio" id="true" value="true" v-model="valor">
        <label for="true">True</label>
        <input type="radio" id="false" value="false" v-model="valor">
        <label for="false">False</label>
    </div>
    <div v-else>
        <input type="text" class="form-control" style="margin-bottom: 20px;" v-model="valor" placeholder="Establecer valor inicial">
    </div>
    <button @click="agregarElemento(sensores, valor);" style="margin-left: 5px;">Guardar sensor</button>
</div>


<div v-if="divEjecutor.ejecutor" class="ejecutor card p-3" style="border: 1px solid black;">
    <h3>Tipos de ejecutores: </h3>
    <select class="form-select mb-3" v-model="ejecutores">
        <option value="temperatura">Control de temperatura</option>
    </select>
    <h3>Valor inicial:</h3>
    <div v-if="ejecutores === 'temperatura'">
        <input type="radio" id="true" value="true" v-model="valor">
        <label for="true">True</label>
        <input type="radio" id="false" value="false" v-model="valor">
        <label for="false">False</label>
    </div>
                
        <button @click="agregarElemento(ejecutores, valor);" style="margin-left: 5px;">Guardar ejecutor</button>

</div>

    </div>
</template>

<style scoped>

.sala input {
    width: 100%;
}

.input {
  height: 40px;
  margin-top: 10px;
}

.sensor,
.ejecutor {
    display: inline-block;
    width: 45%;
    margin: 10px;
}

.card{
    box-shadow: 1px 1px 1px 1px black;
}
</style>