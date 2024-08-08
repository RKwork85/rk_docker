import {createRouter,createWebHashHistory} from 'vue-router'
// import {createRouter,createWebHistory} from 'vue-router'


const routes = [
    {
        path:'/',
        // alias:'/home',
        alias:['/home','/index'],

        // component: () => import('../views/index.vue')
        component: () => import('@/views/datasetPage/index.vue')
        
    },

    {
        path:'/login',
        component: () => import("@/views/datasetPage/login.vue"),

    },
    {
        path:'/format',
        component: () => import("@/views/datasetPage/format.vue"),
    },
    {
        path:'/crawler',
        component: () => import("@/views/datasetPage/crawler.vue"),
    },
    {
        path:'/datasetground',
        component: () => import("@/views/datasetPage/datasetGround.vue"),
    },
    {
        path:'/userspace',
        component: () => import("@/views/datasetPage/userSpace.vue"),
    },
]

const router =createRouter({
    // history:createWebHistory(import.meta.env.VITE_BASE_PATH),
    history:createWebHashHistory(),
    routes
})

export default router