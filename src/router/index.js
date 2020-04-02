import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Recent from '../views/Recent.vue'
import NextDays from '../views/NextDays.vue'
import Favorites from '../views/Favorites.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recent',
    component: Recent
  },
  {
    path: '/NextDays',
    name: 'NextDays',
    component: NextDays
  },
  {
    path: '/Favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/About',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
