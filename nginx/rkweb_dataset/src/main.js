import { createApp } from 'vue'
import App from './App.vue'
// *********************** pinia *********************************

import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// *********************** vue-router ****************************
import router from './router'

// *********************** element plus **************************
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //导入 ElementPlus 组件库中的所有图标

// *********************** vue-lazy-load *************************
import VueLazyloadNext from 'vue-lazyload-next'


// *********************** main **********************************

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus).use(VueLazyloadNext)
// import '../src/assets/style/bootstrap5.scss'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 待修改
// 全局前置守卫， 前置中间件
router.beforeEach((to, from, next) => {
    console.log("to", to)
    console.log("from", from)
    next()

    /* if(to.name == 'member'){
    //     next(false)
    // }else{
    //     next()
     }*/   //member页拦截

     //定义一个别名，就能把它拦截下来
    //  if(to.name == 'neirong'){
    //      next(false)
    //  }else{
    //      next()
    //  }           
})
// Bootstrap5 JS
// import * as bootstrap from 'bootstrap'

app.use(pinia).use(router).mount('#app')
