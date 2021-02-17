<template>
  <v-container class="text-center px-0" fluid> 
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col v-for="attr in numAttr" :key="attr" :what='test'>
            <CharacterAttrBlock></CharacterAttrBlock>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-list-item class="pa-1">
              <v-card class="d-flex justify-center" width="100%">
                <v-list width="100%">
                  <v-list-item class="px-2 justify-space-around">
                    <v-card class="d-flex justify-center" width="48%">
                      <v-card-text class="pa-0">
                        Str
                      </v-card-text>
                      <v-card-text class="pa-0" cols="4">
                        0
                      </v-card-text>
                    </v-card>
                    <v-spacer></v-spacer>
                    <v-card class="d-flex justify-center" width="48%">
                      <v-card-text class="pa-0">
                        Int
                      </v-card-text>
                      <v-card-text class="pa-0">
                        0
                      </v-card-text>
                    </v-card>
                  </v-list-item>
                  <v-list-item class="px-2 justify-space-around">
                    <v-card class="d-flex justify-center" width="48%">
                      <v-card-text class="pa-0">
                        Con
                      </v-card-text>
                      <v-card-text class="pa-0">
                        0
                      </v-card-text>
                    </v-card>
                    <v-spacer></v-spacer>
                    <v-card class="d-flex justify-center" width="48%">
                      <v-card-text class="pa-0">
                        Wis
                      </v-card-text>
                      <v-card-text class="pa-0">
                        0
                      </v-card-text>
                    </v-card>
                  </v-list-item>
                  <v-list-item class="px-2 justify-space-around">
                    <v-card class="d-flex justify-center" width="48%">
                      <v-card-text class="pa-0">
                        Dex
                      </v-card-text>
                      <v-card-text class="pa-0">
                        0
                      </v-card-text>
                    </v-card>
                    <v-spacer></v-spacer>
                    <v-card class="d-flex justify-center" width="48%">
                      <v-card-text class="pa-0">
                        Cha
                      </v-card-text>
                      <v-card-text class="pa-0">
                        0
                      </v-card-text>
                    </v-card>
                  </v-list-item>
                  <div>
                    <v-card-text class="pa-0">
                      Saving Throws
                    </v-card-text>
                  </div>
                </v-list>
              </v-card>
            </v-list-item>
            <v-list-item class="pa-1">
              <v-card class="d-flex justify-center" width="100%">
                <v-card-title>
                  Senses
                </v-card-title>
              </v-card>
            </v-list-item>
            <v-list-item class="pa-1">
              <v-card class="d-flex justify-center" width="100%">
                <v-card-title>
                  Languages and Proficencies
                </v-card-title>
              </v-card>
            </v-list-item>
          </v-col>
          <v-col cols="6">
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CharacterAttrBlock from '../components/CharacterAttrBlock.vue'

export default {
  name: 'CharacterDetails',
  components: {
    CharacterAttrBlock,
  },
  data () {
    return {
      numAttr: ["Strength","Constitution","Dexterity","Intelligence","Wisdom","Charisma"],
      test: "123"
    }
  },
  props: [],
  methods: {
  }
   
}
</script>

<style scoped>
</style>