import './assets/main.css'

import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'

import App from './App.vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from './router'

import '@arco-design/web-vue/dist/arco.css'
import '@/assets/style/global.less'

const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)

app.mount('#app')