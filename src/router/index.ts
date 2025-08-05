// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import BookView from '@/views/BookView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/book', name: 'Book', component: BookView },
    { path: '/dashboard', name: 'Dashboard', component: DashboardView }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router