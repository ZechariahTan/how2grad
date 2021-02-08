<template>
  <v-container>
    <v-row v-for="(n, sem) in numSem" :key="sem" justify="center">
      <Semester :year='year + 1' :semester='sem + 1' :semModuleCodes='yearModules[sem]'  v-on:addModule="changeModuleList" v-on:removeModule="changeModuleList"  />
    </v-row>
  </v-container>
</template>

<script>
import Semester from '../components/Semester.vue'

export default {
  name: 'Year',
  components: {
    Semester
  },
  data () {
    return {
    }
  },
  methods: {
    changeModuleList(eventData) {
      this.$emit('changeModuleList', eventData)
    }
  },
  props: ['year', 'numSem', 'yearModules']
}
</script>

<style scoped>
</style>
