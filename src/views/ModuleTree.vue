<template>
  <Tree v-bind:requiredModules='requiredModules' :modulePlan="modulePlan"/>
</template>

<script>
import Tree from '../components/moduleTree/Tree.vue'

export default {
  name: 'moduleTree',
  components: {
    Tree
  },
  data () {
    return {
      requiredModules: [],
      modulePlan: []
    }
  },
  methods: {
  },
  created () {
    if (localStorage.getItem('plannedModules')) {
      console.log('EXISTS')
      console.log(localStorage.getItem('plannedModules'))
      try {
        this.modulePlan = JSON.parse(localStorage.getItem('plannedModules'))
        this.requiredModules = this.modulePlan.flat(2)
        console.log(this.plannedModules)
      } catch (e) {
        localStorage.removeItem('plannedModules')
      }
    }
  }
}
</script>

<style scoped>

</style>
