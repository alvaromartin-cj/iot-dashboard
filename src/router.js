import { createRouter, createWebHistory } from 'vue-router';
import Principal from './views/paginaPrincipal.vue';
import Cliente from './views/espacioCliente.vue';
import Control from './views/controlEspacio.vue';
import SalaDetalle from './views/SalaDetalle.vue' 

const routes = [
  { path: '/', component: Principal, name: 'paginaPrincipal' },
  { path: '/espacioCliente', component: Cliente, name: 'espacioCliente' },
  { path: '/controlEspacio', component: Control, name: 'controlEspacio' },
  { path: '/salaDetalle/:id', component: SalaDetalle, name: 'salaDetalle' },

];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});


export default router;
