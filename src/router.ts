import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'
import AdminPanel from './components/AdminPanel.vue'

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
        }
    ]
})

export default router