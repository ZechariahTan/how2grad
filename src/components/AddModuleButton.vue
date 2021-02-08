<template>
  <v-row>
    <v-dialog v-model="dialog" rounded scrollable max-width="900px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="black" outlined x-large rounded v-bind="attrs" v-on="on" min-width="400px">
          + Add Module
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Add Modules
          <!-- <v-btn color="red darken-1" outlined text @click="dialog = false; selectedModules = []" class="mr-4">Close</v-btn> -->
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left">
              <v-card-text >
                <v-autocomplete
                  v-model="selectedModules"
                  :items="modules"
                  :search-input.sync="search"
                  class="text-lg-h6 font-weight-regular"
                  flat
                  chips
                  multiple
                  color="grey lighten"
                  hide-no-data
                  hide-selected
                  item-text="moduleCode"
                  item-value="moduleCode"
                  placeholder="Search by module code or module name..."
                  label="Search for Modules"
                  prepend-icon="mdi-book"
                  return-object
                >
                                      <template v-slot:selection="data">
                                        <v-chip
                                          v-bind="data.attrs"
                                          :input-value="data.selected"
                                          close
                                          @click="data.select"
                                          @click:close="remove(data.item)"
                                        >
                                          {{ data.item.moduleCode }}
                                        </v-chip>
                                      </template>
                                      <template v-slot:item="data">
                                        <!-- <template v-if="typeof data.item !== 'object'">
                                          <v-list-item-content v-text="data.item"></v-list-item-content>
                                        </template> -->
                                        <template>
                                          <v-list-item-content>
                                            <v-list-item-title v-html="data.item.moduleCode"></v-list-item-title>
                                          </v-list-item-content>
                                        </template>
                                      </template>
              </v-autocomplete>
              </v-card-text>
        <h2 class="mx-1">Selected Modules</h2>
        </v-card-text>
                <v-card rounded class="mx-5 grey lighten-3 text-lg-left overflow-y-auto" min-height="470px" max-height="470px">
                      <v-list-item-group color="black">
                        <h3 class="text-lg-center my-15 grey--text" v-if="isEmpty">There are currently no selected modules</h3>
                        <v-list-item
                          class="grey lighten-3"
                          v-for="(module, i) in selectedModules"
                          :key="i"
                          overflow-y:auto
                        >
                          <v-list-item-content>
                            <div class="overline mb-4">{{module.faculty + ", " + "Department of " + module.department}}</div>
                            <v-list-item-title v-text="module.moduleCode" class="text-lg-h6" ></v-list-item-title>
                            <v-list-item-title v-text="module.title" class="text-lg-subtitle-1"></v-list-item-title>
                            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Modular Credits: " + module.moduleCredit}}</v-list-item-subtitle>
                            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Prerequisites: " + module.prerequisite}}</v-list-item-subtitle>
                            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Preclusions: " + module.preclusion}}</v-list-item-subtitle>
                            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Workload: " + module.workload}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                  <v-btn v-if="model" class="mx-2" color="green darken-2" outlined x-large rounded @click="dialog = false; addModule()" min-width="280px">
                    Confirm
                  </v-btn>
                  <v-btn v-if="model" color="red darken-2" outlined x-large rounded @click="model = null;" min-width="280px">
                    Clear
                  </v-btn>
                </v-card >
        <v-card-actions>
                <v-btn class="mx-2" color="green darken-2" outlined x-large rounded @click="dialog = false; confirmModules()" min-width="280px">
                  Confirm
                </v-btn>
                <v-btn color="red darken-2" outlined x-large rounded @click="selectedModules = []" min-width="280px">
                  Clear All
                </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddModuleButton',
  components: {
  },
  data () {
    return {
      NameSearchString: '',
      modules: [],
      dialog: false,
      module: null,
      selectedModules: [],
      test: null,
      isEmpty: true
    }
  },
  methods: {
    confirmModules () {
      for(let i=0; i<this.selectedModules.length; i++) {
        this.selectedModules[i].moduleCode = this.selectedModules[i].moduleCode.split(" ")[0]
      }
      this.$emit('addModule', this.selectedModules)
    },
    remove (value) {
      this.selectedModules = this.selectedModules.filter(mod => mod !== value)
    }
  },
  watch: {
    selectedModules: function () {
      if(this.selectedModules.length == 0) {
        this.isEmpty = true
      }
      else {
        this.isEmpty = false
      }
      
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

<style>
</style>
