import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { Quasar, Notify } from 'quasar'
import './style.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import Index from './pages/Index.vue'
import Chat from './pages/Chat.vue'
import { createStore } from 'vuex'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/chat', name: 'Chat', component: Chat },
  ],
})

const store = createStore({
  state (): { name: string } {
    return {
      name: '',
    }
  },
  mutations: {
    setName (state, payload: string): void {
      state.name = payload
    }
  }
})

createApp(App)
  .use(router)
  .use(Quasar, {
    plugins: {
      Notify
    },
  })
  .use(store)
  .mount('#app')
