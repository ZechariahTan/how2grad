<template>
  <div class="img-overlay-wrap">
    <Structure v-if="modulePrereqData.size > 0"
      v-bind:requiredModules='requiredModules'
      :modulePlan="modulePlan"
      :modulePrereqData='modulePrereqData'
      :modulePrereqDataNoModifiers='reqModsNoModfiers'
      :moduleData='moduleData'
      :warnMap='warnMap'/>
    <template v-else>
      <div class="text-lg-h3">
        No modules selected
      </div>
    </template>
  </div>
</template>

<script>
// import Vue from 'vue'
import Structure from './Structure.vue'
import axios from 'axios'

export default {
  name: 'Tree',
  components: {
    Structure
  },
  data () {
    return {
      moduleData: new Map(),
      modulePrereqData: new Map(),
      warnMap: new Map()
    }
  },
  props: ['requiredModules', 'modulePlan'],
  methods: {
    initData () {
      const promises = []
      for (let i = 0; i < this.requiredModules.length; i++) {
        promises.push(axios.get('https://api.nusmods.com/v2/2019-2020/modules/' + this.requiredModules[i] + '.json'))
      }
      axios.all(promises).then(promise => promise.forEach(response => this.moduleData.set(response.data.moduleCode, response.data)))
        .then(() => { this.genPrereqData() })
    },

    genPrereqData () {
      this.moduleData.forEach((modData, modCode) => {
        if (modData.prereqTree === undefined) {
          if (modData.prerequisite !== undefined) {
            this.processPrereqPara(modCode)
          }
        } else {
          const prereqTreeArr = this.moduleData.get(modCode).prereqTree
          this.processPrereqTree(modCode, prereqTreeArr)
          this.warnMap.set(modCode, this.checkWarn(modCode, prereqTreeArr))
        }
      })
      this.$forceUpdate()
    },

    processPrereqPara (moduleCode) {
      let temp = []
      // FILTER 1: to filter out the other words leaving only the module
      // temp = this.moduleData.get(moduleCode).prerequisite.split(' ').filter(str => this.modPrefixReq.test(str))
      temp = this.moduleData.get(moduleCode).prerequisite.split(' ').filter(str => str.match(/.?\w+\d\d\d\d\w*.?/) !== null)
      // FILTER 2: to fIlter out unwanted characters like brackets and stuff
      const newList = []
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].match(/\w+\d\d\d\d\w*/) !== null) {
          newList.push(temp[i].match(/\w+\d\d\d\d\w*/)[0])
        }
      }
      // FILTER 3: to filter out the modules that is not included in the list of modules taken
      for (let i = 0; i < newList.length; i++) {
        if (moduleCode !== newList[i]) {
          if (this.reqModsNoModfiers.includes(newList[i])) {
            if (this.modulePrereqData.get(moduleCode) === undefined) {
              this.modulePrereqData.set(moduleCode, new Set().add(newList[i]))
            } else {
              this.modulePrereqData.get(moduleCode).add(newList[i])
            }
            this.warnMap.set(moduleCode, false)
          } else {
            this.warnMap.set(moduleCode, true)
          }
        }
      }
    },

    processPrereqTree (moduleCode, arr) {
      if (typeof arr === 'string') {
        let arrNoModifiers = arr.match(/\w+\d\d\d\d/)[0]
        if (moduleCode !== arrNoModifiers) {
          if (this.reqModsNoModfiers.includes(arrNoModifiers)) {
            if (this.modulePrereqData.get(moduleCode) === undefined) {
              this.modulePrereqData.set(moduleCode, new Set().add(arrNoModifiers))
            } else {
              this.modulePrereqData.get(moduleCode).add(arrNoModifiers)
            }
          }
        }
      } else if (typeof arr === 'object') {
        for (let i = 0; i < Object.entries(arr)[0][1].length; i++) {
          this.processPrereqTree(moduleCode, Object.entries(arr)[0][1][i])
        }
      }
    },
    checkWarn (moduleCode, arr) {
      if (typeof arr === 'string') {
        arr = arr.match(/\w+\d\d\d\d/)[0]
        if (this.reqModsNoModfiers.includes(arr)) {
          return false
        } else {
          return true
        }
      } else {
        if (arr.or !== undefined) { // or array
          let warn = true
          for (let i = 0; i < arr.or.length; i++) {
            if (!this.checkWarn(moduleCode, arr.or[i])) {
              warn = false
            }
          }
          return warn
        } else if (arr.and !== undefined) { // and array
          let warn = false
          for (let i = 0; i < arr.and.length; i++) {
            if (this.checkWarn(moduleCode, arr.and[i])) {
              warn = true
            }
          }
          return warn
        }
      }
    }
  },

  computed: {
    reqModsNoModfiers: function () {
      const temp = []
      this.requiredModules.forEach(modCode => temp.push(modCode.match(/\w+\d\d\d\d/)[0]))
      return temp
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>

</style>
