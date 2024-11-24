import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import VxeUITable from 'vxe-table'
import VxeUI from 'vxe-pc-ui'



import './assets/main.css'
import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'

const app = createApp(App)


app.use(ElementPlus)
app.use(VxeUI)
app.use(VxeUITable)
app.use(createPinia())
app.use(router)

app.mount('#app')
