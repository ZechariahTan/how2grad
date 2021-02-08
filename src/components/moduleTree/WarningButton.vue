<template>
  <v-container class="text-center pa-0" ref='btn-moduleCode'> 
    <v-btn icon
    @click.stop="dialog = true"
    >
      <v-icon class="justify-center" color="orange">mdi-alert</v-icon>
    </v-btn>

    <v-dialog
        v-model="dialog"
        width="500"
        >
      <v-card>
        <v-card-title class="headline pb-0 justify-center">
          Module Prerequisites
        </v-card-title>
        <v-card-text class="pt-0 text-sm-subtitle-2">
          {{msg}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              class = "text-sm-subtitle-2"
              @click="dialog = false"
          >
              <router-link to="/plan">
              go to plan
              </router-link>
          </v-btn>
          <v-btn
              color="primary"
              text
              class = "text-sm-subtitle-2"
              @click="dialog = false">
              close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

export default {
  name: 'WarningButton',
  data () {
    return {
      dialog: false
    }
  },
  props: ['msg'],
  methods: {
    testMethod () {
      console.log('test-warningbutton')
      this.$emit('pos-updated-button')
    }
  },
  computed: {
  },
  mounted () {
    // this.calcPosition()
    console.log(this.$refs['btn-moduleCode'])
    this.$emit('btn-generated', 90)
  }
}
</script>

<style scoped>
</style>
