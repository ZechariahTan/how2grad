<template>
  <v-container class="text-center px-0" fluid> 
    <v-row>
      <v-col>
        <v-card class="mx-auto" :height="cardHeight" tile >
          <v-row class="mx-auto">
            <v-col align="center" class="pa-0 justify-center">
              <v-avatar
                class="profile"
                color="grey"
                :size="cardHeight"
                tile
              >
                <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="pa-0" cols="8" >
              <v-list-item>
                <v-list-item-content class="pa-0">
                  <v-list-item-title class="title">
                    Loooooooooooooooong CharaName
                  </v-list-item-title>
                  <v-list-item-subtitle>Class / Level</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-row class="justify-center">
                  <v-btn color="grey lighten-1 mr-3" small rounded v-on:click="update">
                    <v-icon med class="mr-2">mdi-campfire</v-icon>
                    Short rest
                  </v-btn>
                  <v-btn color="grey lighten-1 ml-3" small rounded v-on:click="update">
                    <v-icon med class="mr-2">mdi-bed</v-icon>
                    Long rest
                  </v-btn>
                </v-row>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="mx-auto">
        <v-card class="mx-auto" :height="cardHeight" tile>
          <v-row class="py-2 justify-center" :key="rerenderKey">
            <v-spacer></v-spacer>
            <div class="text-h5">
              Class: 
            </div>
            <v-btn small>
              Arcane Trickster
            </v-btn>
            <v-spacer></v-spacer>
            <div class="text-h5">
              Race:    
            </div>
            <v-btn small>
              Human
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
          <v-row class="py-2 justify-center" :key="rerenderKey2">
            <v-spacer></v-spacer>
            <div class="text-h5">
              Background:    
            </div>
            <v-btn small>
              Noble
            </v-btn> 
            <v-spacer></v-spacer>
            <div class="text-h5">
              Alignment:    
            </div>
            <v-btn small>
              Chaotic Neutral
            </v-btn>
            <v-spacer></v-spacer>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'CharacterBanner',
  data () {
    return {
      cardHeight: '100px',
      rerenderKey: 0,
      rerenderKey2: 1,
    }
  },
  props: [],
  methods: {
    update() {
      this.rerenderKey++;
      this.$forceUpdate();
    },
  }
}
</script>

<style scoped>
</style>