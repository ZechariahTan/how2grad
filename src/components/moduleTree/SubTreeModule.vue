<template>
  <v-container class="text-center" ref='pos-moduleCode'>
    <v-row justify="center">
      <v-col>
        <v-hover>
          <template v-slot="{ hover }">
            <v-card class="mx-auto"
              min-width="125"
              max-width="300"
              default
              :elevation="hover || related || inHighlightedSem ? 24 : 1"
              :color="hover || locked ? hoverColour : modColour"
              @click="toggleLockState"
              @mouseover="$emit('mouseover', moduleID)"
              @mouseleave="$emit('mouseleave', moduleID)"
              key="componentKey"
            >
              <v-card-title offset-lg12 class="headline pb-0 justify-center">{{moduleID}}</v-card-title>
              <v-card-text class="pt-0 text-sm-subtitle-2">{{moduleTitle}}</v-card-text>
              <v-row>
                <v-col class='pa-0'>
                  <WarningButton v-if='warn' :msg='moduleData.get(moduleID).prerequisite' v-on:pos-updated-button='testUpdate'/>
                </v-col>
              </v-row>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import WarningButton from './WarningButton.vue'

export default {
  name: 'SubTreeModule',
  components: {
    WarningButton
  },
  data () {
    return {
      xthis: 0,
      ythis: 0,
      greenModColour: 'green accent-4',
      redModColour: 'red accent-2',
      hoverColour: 'blue lighten-3',
      cachedColour: '',
      state: 'default',
      componentKey: 0,
      locked: false,
      frozen: false,
      related: false,
      highlighted: false,
      dialog: false,
      warn: this.warnMap.get(this.moduleID)
    }
  },
  props: ['moduleID', 'nodeData', 'moduleData', 'modulePlan', 'warnMap', 'viewSemColours', 'inHighlightedSem'],
  methods: {
    calcPosition () {
      // calculate middle coordinate of element for constructing edges
      this.xthis = (this.$refs['pos-moduleCode'].getBoundingClientRect().left + this.$refs['pos-moduleCode'].getBoundingClientRect().right) / 2.0
      this.ythis = (this.$refs['pos-moduleCode'].getBoundingClientRect().top + this.$refs['pos-moduleCode'].getBoundingClientRect().bottom) / 2.0 + window.scrollY
      
      Vue.prototype.$xcoordinates.push(this.xthis)
      Vue.prototype.$ycoordinates.push(this.ythis)
      Vue.prototype.$modcoordinates.push(this.moduleID)
    },

    updatePos () {
      let index

      for (let i = 0; i < Vue.prototype.$modcoordinates.length; i++) {
        if (this.moduleID === Vue.prototype.$modcoordinates[i]) {
          index = i
          break
        }
      }

      this.xthis = (this.$refs['pos-moduleCode'].getBoundingClientRect().left + this.$refs['pos-moduleCode'].getBoundingClientRect().right) / 2.0
      this.ythis = (this.$refs['pos-moduleCode'].getBoundingClientRect().top + this.$refs['pos-moduleCode'].getBoundingClientRect().bottom) / 2.0 + window.scrollY
      Vue.prototype.$xcoordinates[index] = this.xthis
      Vue.prototype.$ycoordinates[index] = this.ythis
      this.$emit('pos-updated')
    },

    testUpdate() {
      Vue.nextTick(this.updatePos())
      console.log("y: %s", this.ythis)
    },

    toggleLockState () {
      this.$emit('lock-toggled', this.moduleID)
    },

    changeColour (newState) {
      this.state = newState
      if (!this.locked && !this.frozen) {
        this.forceRender()
      }
    },

    forceRender () {
      this.componentKey += 1
    },

    getColour () {
      if (!this.frozen) {
        switch (this.state) {
          case 'red':
            this.cachedColour = this.redModColour
            return this.redModColour
          case 'green':
            this.cachedColour = this.greenModColour
            return this.greenModColour
          default:
            this.cachedColour = this.defaultModColour
            return this.defaultModColour
        }
      } else {
        return this.cachedColour
      }
    }
  },
  computed: {
    moduleTitle: function () {
      return this.moduleData.get(this.moduleID).title
    },

    modColour: function () {
      return this.getColour()
    },

    defaultModColour: function () {
      if (this.viewSemColours || this.inHighlightedSem) {
        let semColourArr = [['#2A9DAF', '#1D8986'],
                            ['#E9C46A', '#CE9E48'],
                            ['#F4A261', '#DD884E'],
                            ['#E76F51', '#C65A44']]

        for(let i = 0; i < this.modulePlan.length; i++) {
          for(let j = 0; j < this.modulePlan[i].length; j++) {
            if(this.modulePlan[i][j].includes(this.moduleID)) {
              return semColourArr[i][j]
            }
          }
        }
        return 'grey lighten-2'
      } else {
        return 'grey lighten-2'
      }
    }
  },
  mounted () {
    this.calcPosition()
  },
  // updated: function () {
  //   this.updatePos()
  //   // this.$emit('pos-updated')
  // },
  watch: {
    xthis: function () {
      this.updatePos()
    },
    ythis: function () {
      this.updatePos()
    }
  }
}
</script>

<style scoped>
</style>
