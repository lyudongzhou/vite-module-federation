import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/es/components/message/style/css'
import "./main.less"
import router from './router'
const app = createApp(App);
app.use(router);
app.mount('#app')
