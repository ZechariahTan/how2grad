<template>
    <v-container fluid>
      <v-row justify="space-between" align="center">
        <div class="float-left">
          <v-switch
            class="pl-7"
            inset
            v-model="viewSemColours"
            :label="`View Year Colours: ${viewSemColours ? 'on' : 'off'}`"
          ></v-switch>
        </div>
        <div class="float-right">
          <v-row class="pr-7">
            <v-col
              v-for="(sem, i) in modulePlan.flat()"
              :key="i"
              class="pa-1"
            >
             <v-btn 
              :color="getBadgeColour(i)"
              :elevation="getElevation(i)"
              :key="buttonComponentKey"
              rounded
              @click="highlightSemMods(i)"
             >
             {{semNameArr[i]}}
             </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-row>
      <v-row>
        <v-col class="text-h3 pb-0">
        Related Module Trees
        </v-col>
      </v-row>
      <v-row class="z-index 100px justify center mb-15" v-for="entry in treesMap" v-bind:key="entry[0]">
        <SubTree v-bind:treeRoot='entry[0]'
        :treeData='entry[1]'
        :modulePrereqData='modulePrereqData'
        :modList='requiredModules'
        :modulePlan='modulePlan'
        :moduleData='moduleData'
        :warnMap='warnMap'
        :viewSemColours="viewSemColours"
        :highlightedSem="highlightedSem"
        :key="treeKey"
        v-on:mouseOverMod="highlightSemBadge"
        v-on:mouseLeaveMod="revertSemBadge"/>
      </v-row>
      <v-row justify="center">
        <v-col class="text-h3">
        Standalone Modules
        </v-col>
      </v-row>
      <v-row>
        <SingleMods v-bind:unlinkedMods="unlinkedModsList"
        :moduleData="moduleData"
        :modulePlan="modulePlan"
        :warnMap='warnMap'
        :viewSemColours="viewSemColours"
        :highlightedSem="highlightedSem"
        :key="singleModsKey"/>
      </v-row>
    </v-container>
</template>

<script>
import Vue from 'vue'
import SubTree from './SubTree.vue'
import SingleMods from './SingleMods.vue'

Vue.prototype.$xcoordinates = []
Vue.prototype.$ycoordinates = []
Vue.prototype.$modcoordinates = []

export default {
  name: 'Structure',
  components: {
    SubTree,
    SingleMods
  },
  data () {
    return {
      parentMap: new Map(),
      sizeMap: new Map(),
      setMap: new Map(),
      treesMap: new Map(),
      unlinkedModsList: [],
      buttonComponentKey: 0,
      buttonPressed: [false, false, false, false, false, false, false, false],
      semNameArr: ['Y1S1', 'Y1S2', 'Y2S1', 'Y2S2', 'Y3S1', 'Y3S2', 'Y4S1', 'Y4S2'],
      elevationArr: [[0, 0], [0, 0], [0, 0], [0, 0]],
      viewSemColours: false,
      highlightedSem: [false, false, false, false, false, false, false, false],
      treeKey: 0,
      singleModsKey: 0
    }
  },
  methods: {

    initMap () {
      this.requiredModules.forEach(moduleCode => {
        this.parentMap.set(moduleCode, moduleCode)
        this.sizeMap.set(moduleCode, 1)
        this.setMap.set(moduleCode, new Set().add(moduleCode))
      })
    },
    findParent (moduleCode) {
      let pCode = this.parentMap.get(moduleCode)
      while (pCode !== moduleCode) {
        moduleCode = pCode
        pCode = this.parentMap.get(moduleCode)
      }
      return pCode
    },
    isSameSet (moduleCode1, moduleCode2) {
      return this.findParent(moduleCode1) === this.findParent(moduleCode2)
    },
    isPreReq (moduleCode1, moduleCode2) {
      if (this.modulePrereqData.get(moduleCode1) === undefined && this.modulePrereqData.get(moduleCode2) !== undefined) {
        const module2PrereqTree = this.modulePrereqData.get(moduleCode2)
        if (!moduleCode1.substr(-1).match(/\d/)) {
          moduleCode1 = moduleCode1.match(/\w+\d\d\d\d/)[0]
        }
        return module2PrereqTree.has(moduleCode1)
      } else if (this.modulePrereqData.get(moduleCode2) === undefined && this.modulePrereqData.get(moduleCode1) !== undefined) {
        const module1PrereqTree = this.modulePrereqData.get(moduleCode1)
        if (!moduleCode2.substr(-1).match(/\d/)) {
          moduleCode2 = moduleCode2.match(/\w+\d\d\d\d/)[0]
        }
        return module1PrereqTree.has(moduleCode2)
      } else if (this.modulePrereqData.get(moduleCode2) !== undefined && this.modulePrereqData.get(moduleCode1) !== undefined) {
        const module1PrereqTree = this.modulePrereqData.get(moduleCode1)
        const module2PrereqTree = this.modulePrereqData.get(moduleCode2)
        if (!moduleCode1.substr(-1).match(/\d/)) {
          moduleCode1 = moduleCode1.match(/\w+\d\d\d\d/)[0]
        }
        if (!moduleCode2.substr(-1).match(/\d/)) {
          moduleCode2 = moduleCode2.match(/\w+\d\d\d\d/)[0]
        }
        return module1PrereqTree.has(moduleCode2) || module2PrereqTree.has(moduleCode1)
      } else {
        return false
      }
    },
    union (moduleCode1, moduleCode2) {
      const p1 = this.findParent(moduleCode1)
      const p2 = this.findParent(moduleCode2)
      if (this.sizeMap.get(p1) <= this.sizeMap.get(p2)) {
        this.parentMap.set(p1, p2)
        this.sizeMap.set(p2, this.sizeMap.get(p2) + this.sizeMap.get(p1))
        this.sizeMap.set(p1, 0)
        const currSet = this.setMap.get(p2)
        this.setMap.get(p1).forEach((value) => currSet.add(value))
        this.setMap.set(p2, currSet)
        this.setMap.delete(p1)
      } else {
        this.parentMap.set(p2, p1)
        this.sizeMap.set(p1, this.sizeMap.get(p1) + this.sizeMap.get(p2))
        this.sizeMap.set(p2, 0)
        const currSet = this.setMap.get(p1)
        this.setMap.get(p2).forEach((value) => currSet.add(value))
        this.setMap.set(p1, currSet)
        this.setMap.delete(p2)
      }
    },
    genSubTreeSets () {
      // todo make effecient later on
      this.initMap()
      for (let i = 0; i < this.requiredModules.length; i++) {
        const modI = this.requiredModules[i]
        for (let j = 0; j < this.requiredModules.length; j++) {
          const modJ = this.requiredModules[j]
          if (i !== j) {
            if (this.isSameSet(modI, modJ)) {
              continue
            }
            if (this.isPreReq(modI, modJ)) {
              this.union(modI, modJ)
            }
          }
        }
      }
      this.getTrees()
      console.log('subTreeSetsGenerated')
      this.$forceUpdate()
    },
    getTrees () {
      this.setMap.forEach((value, key) => {
        if (value.size > 1) {
          this.treesMap.set(key, value)
        } else {
          this.unlinkedModsList.push(key)
        }
      })
    },
    getBadgeColour(i) {
      const semColourArr= [['#2A9DAF', '#1D8986'],
      ['#E9C46A', '#CE9E48'],
      ['#F4A261', '#DD884E'],
      ['#E76F51', '#C65A44']]
      const temp = semColourArr.flat(2)
      if (!this.buttonPressed[i] && !this.viewSemColours) {
        return 'grey lighten-2'
      } else {
        return temp[i]
      }
    },
    getElevation(i) {
      // console.log('%s, %s %s: %s',i, ~~(i/2), i%2, this.elevationArr[~~(i/2)][i%2])
      // console.log('%s: %s',~~(i/4),i%4)
      return this.elevationArr[~~(i/2)][i%2]
    },
    highlightSemBadge(hoveredModCode) {
      for (let i = 0; i < this.modulePlan.length; i++) {
        for (let j = 0; j < this.modulePlan[i].length; j++) {
          if (this.modulePlan[i][j].includes(hoveredModCode)) {
            this.elevationArr[i][j] = 24
            this.buttonComponentKey++
          }
        }
      }

    },
    revertSemBadge(hoveredModCode) {
      for (let i = 0; i < this.modulePlan.length; i++) {
        for (let j = 0; j < this.modulePlan[i].length; j++) {
          if (this.modulePlan[i][j].includes(hoveredModCode)) {
            this.elevationArr[i][j] = 0
            this.buttonComponentKey++
          }
        }
      }
    },
    highlightSemMods(i) {
      this.highlightedSem[i] = !this.highlightedSem[i]
      this.buttonPressed[i] = !this.buttonPressed[i] 
      this.buttonComponentKey++
      this.treeKey++
      this.singleModsKey++
    },
  },
  props: ['requiredModules', 'modulePlan', 'modulePrereqData', 'modulePrereqDataNoModifiers', 'moduleData', 'warnMap'],
  watch:{
    viewSemColours: function () {
      for (let i = 0; i < this.buttonPressed.length; i++) {
        this.buttonPressed[i] = this.viewSemColours
        this.highlightedSem[i] = this.viewSemColours
      }
      this.buttonComponentKey++
      this.treeKey++
      this.singleModsKey++
    }
  },
  mounted () {
    this.genSubTreeSets()
  }
}
</script>

<style scoped>
    
    #inner-struct ul{
        display: inline-flex;
    }

    .leaf-style {
        padding: 0px;
        position: relative;
    }
</style>
