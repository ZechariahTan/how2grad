import Vue from 'vue'
import VueRouter from 'vue-router'
import CharacterSheet from '../views/CharacterSheet.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/character',
    name: 'Character',
    component: () => import('../views/CharacterSheet.vue')
  },
  {
    path: '/moduleinfo',
    name: 'ModuleInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ModuleInfo.vue')
  },
  {
    path: '/moduletree',
    name: 'ModuleTree',
    component: () => import('../views/ModuleTree.vue')
  },
  {
    path: '/',
    redirect:'/character',
    name: 'Character',
    component: CharacterSheet
  }
]

const router = new VueRouter({
  routes
})

export default router
