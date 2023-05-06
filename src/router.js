import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path:'/',
            name: 'Preview',
            component: () => import('@/views/index.vue')
        },
        {
            path:'/search',
            name: 'Search',
            component: () => import('@/views/search.vue')
        },
        {
            path:'/:catchAll(.*)',
            name: 'pages',
            component: () => import('@/views/index.vue')
        },
        
    ]
})

export default router