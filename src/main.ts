import { createApp } from "vue"
import App from "./App.vue"

import { createPinia } from "pinia"
import { router } from "./router"

import "vuetify/styles"
import { createVuetify } from "vuetify"

import '@/styles/main.scss'
import "@mdi/font/css/materialdesignicons.css"

const vuetify = createVuetify()

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount("#app")
