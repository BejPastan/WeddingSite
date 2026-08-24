import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { useLanguage } from './stores/language'
import 'vue3-flag-icons/styles'

const { setLanguage, detectPreferred } = useLanguage()
setLanguage(detectPreferred())

createApp(App).mount('#app')
