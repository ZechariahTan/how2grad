<template>
  <v-container class="text-center pa-0" fluid cols="2"> 
    <v-card cols="2">
      <div class="pa-0 text-sm-subtitle-2">
        {{this.what}}
      </div>
      <v-card-title class="pa-0 justify-center">
        0
      </v-card-title>
      <v-card-text class="pa-0 justify-center">
        10
      </v-card-text>
    </v-card>
    <v-spacer></v-spacer>
  </v-container>
</template>

<script>

export default {
  name: 'CharacterAttrBlock',
  data () {
    return {
      cardHeight: '100px',
      renderKey: 0,
    }
  },
  props: ['what'],
  methods: {
  },
  computed: {
    attrTitle: function () {
      return this.what
    },
  },
}
</script>

<style scoped>
</style>