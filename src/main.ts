import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { useLanguage } from './stores/language'


const { setLanguage, detectPreferred } = useLanguage()
setLanguage(detectPreferred())

createApp(App).mount('#app')
