<template>
  <v-container class="text-center pa-0" fluid :key="rerenderKey">
    <!-- <v-navigation-drawer
      permanent
      expand-on-hover
      absolute
      right
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              CharaName
            </v-list-item-title>
            <v-list-item-subtitle>CharaLevel / Class</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item link to="/plan" id="nav-element">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Character</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-row>
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
                  <v-btn color="grey lighten-1 mr-3" small rounded v-on:click="forceUpdate">
                    <v-icon med class="mr-2">mdi-delete-sweep</v-icon>
                    Short rest
                  </v-btn>
                  <v-btn color="grey lighten-1 ml-3" small rounded v-on:click="removeAll">
                    <v-icon med class="mr-2">mdi-delete-sweep</v-icon>
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
          <v-row class="mx-auto justify-center" :key="rerenderKey">
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
          <v-row class="mx-auto justify-center" :key="rerenderKey">
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
        
          </v-row>
        </v-card>
      </v-col>
    </v-row> -->
    <CharacterBanner></CharacterBanner>
    <CharacterDetails></CharacterDetails>
    <v-btn color="grey lighten-1 ml-3" small rounded v-on:click="update">
      <v-icon med class="mr-2">mdi-bed</v-icon>
      test
    </v-btn>
  </v-container>

  <!-- <v-col
    align-self="start"
    class="pa-0"
  >
    <v-avatar
      class="profile"
      color="grey"
      size="125"
      tile
      align="start"
    >
      <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
    </v-avatar>
  </v-col>
  <v-col class="py-0" cols="8">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          CharaName
        </v-list-item-title>
        <v-list-item-subtitle>CharaClass / Level</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="justify-center">
      <v-btn color="grey lighten-1 mr-3" small rounded v-on:click="removeAll">
        <v-icon med class="mr-2">mdi-delete-sweep</v-icon>
        Short rest
      </v-btn>
      <v-btn color="grey lighten-1 ml-3" small rounded v-on:click="removeAll">
        <v-icon med class="mr-2">mdi-delete-sweep</v-icon>
        Long rest
      </v-btn>
    </v-list-item>
  </v-col> -->

  <!-- <v-card class="mx-auto fill-height" colour="grey" tile>
          <v-row class="justify-space-around fill-height">
            <v-col class="align-center fill-height">
              <v-list-item align-self="center" class ="py-0 my-0">
                <v-row class="justify-center fill-height">
                  <div class="text-h5">
                    Class: 
                  </div>
                  <v-btn small>
                    Arcane Trickster
                  </v-btn>
                </v-row>
              </v-list-item>
              <v-list-item align-self="center">
                <v-row class="justify-center">
                  <div class="text-h5">
                    Race: 
                  </div>
                  <v-btn small>
                    Human
                  </v-btn>
                </v-row>
              </v-list-item>
            </v-col>
            <v-col class="align-center">
              <v-list-item align-self="center" class ="py-0 my-0">
                <v-row class="justify-center">
                  <div class="text-h5">
                    Background: 
                  </div>
                  <v-btn small>
                    Noble
                  </v-btn>
                </v-row>
              </v-list-item>
              <v-list-item align-self="center">
                <v-row class="justify-center">
                  <div class="text-h5">
                    Alignment: 
                  </div>
                  <v-btn small>
                    Chaotic Neutral
                  </v-btn>
                </v-row>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card> -->
</template>

<script>
import CharacterBanner from '../components/CharacterBanner.vue'
import CharacterDetails from '../components/CharacterDetails.vue'

export default {
  name: 'CharacterSheet',
  components: {
    CharacterBanner,
    CharacterDetails,
  },
  data () {
    return {
      rerenderKey: 0,
    }
  },
  mounted () {
  },
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
