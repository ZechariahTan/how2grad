<template>
  <v-card
    color="grey lighten-2"
  >
    <v-card-text >
      <v-autocomplete
        v-model="model"
        :items="modules"
        :search-input.sync="search"
        class="text-lg-h6 font-weight-regular"
        flat
        color="grey"
        hide-no-data
        hide-selected
        item-text="moduleCode"
        placeholder="Search by module code or module name..."
        label="Search for a Module"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="model" class="mx-5 grey lighten-2 text-lg-left">
        <v-list-item-content>
          <div class="overline mb-4">{{model.faculty + ", " + "Department of " + model.department}}</div>
          <v-list-item-title class="headline mb-2">{{model.moduleCode}}</v-list-item-title>
          <p class="mb-5">{{model.description}}</p>
          <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Modular Credits: " + model.moduleCredit}}</v-list-item-subtitle>
          <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Prerequisites: " + model.prerequisite}}</v-list-item-subtitle>
          <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Preclusions: " + model.preclusion}}</v-list-item-subtitle>
          <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Workload: " + model.workload}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list>
    </v-expand-transition>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!model"
        color="red lighten-3"
        @click="model = null"
      >
        Close
        <v-icon right>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      isEditing: true,
      model: null,
      NameSearchString: '',
      modules: [],
      entries: [],
      search: null
    }
  },
  async created () {
    try{
      let response = await axios.get('https://api.nusmods.com/v2/2018-2019/moduleInfo.json')
      this.modules = response.data
    } catch(err){
      console.log(err)
    }
    // Concatenate moduleCode with title
    for(let i=0; i < this.modules.length; i++) {
      this.modules[i].moduleCode = this.modules[i].moduleCode + " " + this.modules[i].title
    }
  }
}
</script>

<style scoped>
</style>
