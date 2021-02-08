<template>
  <v-card
    class="mx-0 my-1"
    width="420"
    min-height="605px"
    :color="semColour"
    rounded
  >
    <v-list :color="semColour" rounded>
      <v-list-item-title class="text-lg-h5 font-weight-bold mb-0">{{titleMsg}}</v-list-item-title>
      <v-list-item-subtitle class="font-weight-regular text-lg-body-1 mb-2">{{"Modular Credits: " + totalMCs}}</v-list-item-subtitle>
      <AddModuleButton class="mx-1 mb-3" v-on:addModule="addModule"/>
      <v-list-item-group color="primary">
        <v-list-item
          class="grey lighten-3"
          v-for="(module, i) in semModuleData"
          :key="i"
        >

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon align="start"
                small
                v-if="suAble(i)"
                color="blue accent 4"
                v-bind="attrs"
                v-on="on">mdi-sticker-check</v-icon>
            </template>
            <span>This module has S/U options</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title v-text="module.moduleCode" class="text-lg-h6" ></v-list-item-title>
            <v-list-item-title v-text="module.title" class="text-lg-subtitle-1"></v-list-item-title>
          </v-list-item-content>
          <v-icon @click="removeModule(module)" color="red lighten-1">mdi-close</v-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import AddModuleButton from '../components/AddModuleButton.vue'
import axios from 'axios'

export default {
  name: 'Semester',
  components: {
    AddModuleButton
  },
  data () {
    return {
      eventData: [],
      semModuleData: [],
      semColourArr: [['#2A9DAF', '#1D8986'],
      ['#E9C46A', '#CE9E48'],
      ['#F4A261', '#DD884E'],
      ['#E76F51', '#C65A44']],
      // semColourArr: ['teal lighten-3', 'teal accent-3', 
      // 'lime', 'amber',
      // 'teal accent-4', 'lime accent-4',
      // 'amber accent-4', 'orange accent-4'],
      totalMCs: 0
    }
  },
  methods: {
    minimizeSearch (value) {
      this.isHidden = value
    },
    addModule (selectedModules) {
      this.isHidden = false
      for(let i=0; i<selectedModules.length; i++) {
        this.semModuleData.push(selectedModules[i])
        this.semModuleCodes.push(selectedModules[i].moduleCode)
      }
      this.eventData[1] = this.semModuleCodes
      this.$emit('addModule', this.eventData)
    },
    removeModule (value) {
      this.semModuleData = this.semModuleData.filter(mod => mod !== value)
      this.semModuleCodes = this.semModuleCodes.filter(mod => mod !== value.moduleCode)
      this.eventData[1] = this.semModuleCodes
      this.$emit('removeModule', this.eventData)
    },
    calculateTotalMCs () {
      let temp = 0
      for(let i=0; i < this.semModuleData.length; i++) {
        temp += parseInt(this.semModuleData[i].moduleCredit, 10)
      }
      this.totalMCs = temp
    },
    suAble (index) {
      return this.semModuleData[index].attributes !== undefined && this.semModuleData[index].attributes.su !== undefined && this.semModuleData[index].attributes.su === true
    }
  },
  watch: {
    semModuleData: function() {
      this.calculateTotalMCs()
    }
  },
  props: ['year', 'semester', 'semModuleCodes'],
  created () {
    axios.get('https://api.nusmods.com/v2/2019-2020/moduleInfo.json')
      .then(response => (
        this.semModuleData = response.data.filter(mod => this.semModuleCodes.includes(mod.moduleCode)))
      )
      .catch(err => console.log(err))
  },
  computed: {
    titleMsg: function () {
      return 'Year ' + this.year + ' Semester ' + this.semester
    },
    semColour: function () {
      return this.semColourArr[(this.year - 1)][(this.semester - 1)]
    }
  },
  mounted: function () {
    this.eventData.push([this.year, this.semester])
    this.eventData.push([])
  }
}
</script>

<style scoped>
  /* .text {
    colour: #c25e45
  } */
</style>
