import Vue from 'vue'
import VueRouter from 'vue-router'
import Plan from '../views/CharacterSheet.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/plan',
    name: 'Plan',
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
    redirect:'/plan',
    name: 'Plan',
    component: Plan
  }
]

const router = new VueRouter({
  routes
})

export default router
