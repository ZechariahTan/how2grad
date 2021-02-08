<template>
    <v-container fluid>
      <v-row>
        <v-col v-for="mod in unlinkedMods" v-bind:key="mod" justify="center">
          <StandaloneModule :moduleID='mod' :moduleData='moduleData' :modulePlan="modulePlan" :warnMap='warnMap' :viewSemColours="viewSemColours" :inHighlightedSem="checkHighlighted(mod)"/>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import StandaloneModule from './StandaloneModule.vue'

export default {
  name: 'SingleMods',
  components: {
    StandaloneModule
  },
  data () {
    return {
      defaultModColour: 'grey lighten-2',
      hoverColour: 'blue lighten-3',
    }
  },
  methods: {
    checkHighlighted (modCode) {
      for (let i = 0; i < this.highlightedSem.length; i++) {
        if(this.highlightedSem[i] && this.modulePlan[~~(i/2)][i%2].includes(modCode)) {
          return true
        }
      }
      return false
    }
  },
  props: ['unlinkedMods', 'moduleData', 'modulePlan', 'warnMap', 'viewSemColours', 'highlightedSem']
}
</script>

<style scoped>
</style>
