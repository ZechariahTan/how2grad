<template>
  <v-row>
    <v-dialog v-model="dialog" scrollable max-width="950px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-8" color="grey lighten-1" x-large rounded v-bind="attrs" v-on="on">
          <v-icon class="mr-2">mdi-book</v-icon>
          Select Plan
        </v-btn>
      </template>
        <v-card
          color="grey lighten-2"
        >
    <v-card-text >
      <v-card-title class="text-lg-h5">Select a Study Plan</v-card-title>
      <v-divider></v-divider>
      <v-autocomplete
        v-model="model"
        :items="plans"
        :search-input.sync="search"
        class="text-lg-h6 font-weight-regular"
        flat
        color="grey lighten-1"
        hide-no-data
        hide-selected
        item-text="name"
        placeholder="Search for degree keywords ('Computer Science' or 'UTCP')"
        label="Search for an existing plan"
        prepend-icon="mdi-database-search"
        return-object
      >
      </v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="model" class="mx-5 grey lighten-2 text-lg-left">
        <v-list-item-content :key="componentKey">
          <v-list-item-title class="headline pl-2">{{model.name}}</v-list-item-title>
          <v-list-item-subtitle class="font-weight-regular text-lg-body-1 pl-2">{{"Author: " + model.author}}</v-list-item-subtitle>
          <p class="ma-5 mx-2">{{model.description}}</p>
          <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Total Modular Credits: " + calculateTotalMCs(model)}}</v-list-item-subtitle>
          <!-- <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Number of Years to Complete: (future plans) "}}</v-list-item-subtitle> -->
          <!-- <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Difficulty Rating: (future plans) "}}</v-list-item-subtitle> -->
        </v-list-item-content>
        <v-btn v-if="model" class="mx-2" color="green darken-2" outlined x-large rounded @click="dialog = false; loadPlan()" min-width="280px">
          <v-icon class="mr-2">mdi-check</v-icon>
          Select
        </v-btn>
        <v-btn v-if="model" color="red darken-2" outlined x-large rounded @click="model = null;" min-width="280px">
          <v-icon class="mr-2">mdi-close</v-icon>
          Cancel
        </v-btn>
      </v-list>
    </v-expand-transition>
    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="red darken-1" outlined text @click="dialog = false; model = null">close</v-btn>
    </v-card-actions>
  </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from '@/firebase';
import axios from 'axios'

export default {
  data () {
    return {
      model: null,
      NameSearchString: '',
      plan: '',
      dialog: false,
      plannedModules:  [[[],[]],[[],[]],[[],[]],[[],[]]],
      allMods: [],
      componentKey: 0,
      totalMcs: 0
    }
  },
  firestore() {
    return {
      plans: db.collection('plans').orderBy("name"),
    }
  },
  methods: {
    loadPlan () {

      this.plannedModules[0][0] = this.model.y1s1
      this.plannedModules[0][1] = this.model.y1s2
      this.plannedModules[1][0] = this.model.y2s1
      this.plannedModules[1][1] = this.model.y2s2
      this.plannedModules[2][0] = this.model.y3s1
      this.plannedModules[2][1] = this.model.y3s2
      this.plannedModules[3][0] = this.model.y4s1
      this.plannedModules[3][1] = this.model.y4s2

      this.$emit('selectedPlan', this.plannedModules)
    },
    calculateTotalMCs (model) {
      let allModsArr = []
      allModsArr.push(model.y1s1)
      allModsArr.push(model.y1s2)
      allModsArr.push(model.y2s1)
      allModsArr.push(model.y2s2)
      allModsArr.push(model.y3s1)
      allModsArr.push(model.y3s2)
      allModsArr.push(model.y4s1)
      allModsArr.push(model.y4s2)
      allModsArr = allModsArr.flat()

      const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.moduleCredit)

      axios.get('https://api.nusmods.com/v2/2019-2020/moduleInfo.json')
      .then(response => response.data.filter(mod => allModsArr.includes(mod.moduleCode)))
      .then(allModsArrData => allModsArrData.reduce(reducer, 0))
      .then(result => this.totalMcs = result)
      .catch(err => console.log(err))
      return this.totalMcs
    }
  },
  watch: {
    totalMcs: function () {
      this.componentKey++
    }
  }
}
</script>

<style>
</style>
