import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
    history: createWebHistory('/laws/'),
    routes: [
        {
            path:'/',
            name: 'Preview',
            component: () => import('@/views/index.vue')
        },
        {
            path:'/404',
            name:'404',
            component: () => import('@/views/404.vue')
        },
        {
            path:'/:catchAll(.*)',
            name: 'pages',
            component: () => import('@/views/index.vue')
        },
        
    ]
})

export default router