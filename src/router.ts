import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import AdminPanel from './components/AdminPanel.vue'
import TerminalOnly from './views/TerminalOnly.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'home',
      component: Home 
    },
    { 
      path: '/admin-tianshi', 
      name: 'admin',
      component: AdminPanel 
    },
    {
      // Aggiungiamo il parametro dinamico opzionale :lang
      path: '/terminal/:lang?', 
      name: 'terminal',
      component: TerminalOnly
    }
  ]
})

export default router