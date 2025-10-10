import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView,
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView,
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI,
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI,
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
  {
    path: '/FireSignin',
    name: 'FireSignin',
    component: FirebaseSigninView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
