<template>
  <v-row>
    <v-dialog v-model="dialog" scrollable max-width="850px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-4" color="grey lighten-1" x-large rounded v-bind="attrs" v-on="on">
          <v-icon large class="mr-2">mdi-upload</v-icon>
          Upload Plan
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-lg-h5">Upload Study Plan</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left" max-height="850px">
          <v-list-item-content>
            <v-list-item>
              <v-text-field
                label="Name of Study Plan"
                placeholder="Computer Science Major..."
                v-model="uploadName"
                outlined
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                label="Name of Author"
                placeholder="Your name here..."
                v-model="authorName"
                outlined
              ></v-text-field>
            </v-list-item>
            <v-list-item>
            <v-textarea
              v-model="details"
              outlined
              label="Description"
              value=""
            ></v-textarea>
            </v-list-item>
            <v-list-item-title class="headline mb-2">{{"Your Study Plan Summary"}}</v-list-item-title>
            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Y1S1: " + modListStrArr[0][0]}}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Y1S2: " + modListStrArr[0][1]}}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Y2S1: " + modListStrArr[1][0]}}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Y2S2: " + modListStrArr[1][1]}}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Y3S1: " + modListStrArr[2][0]}}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Y3S2: " + modListStrArr[2][1]}}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Y4S1: " + modListStrArr[3][0]}}</v-list-item-subtitle>
            <v-list-item-subtitle class="font-weight-regular text-lg-body-1">{{"Y4S2: " + modListStrArr[3][1]}}</v-list-item-subtitle>
            <v-dialog v-model="dialogconfirm" persistent max-width="400">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mt-5"
                  color="green darken-2"
                  v-bind="attrs"
                  v-on="on"
                  max-width="380px"
                  outlined
                  x-large
                  rounded
                >
              <v-icon class="mr-2">mdi-cloud-upload</v-icon>
              Confirm Upload
            </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">Confirm Upload?</v-card-title>
                <v-card-text class="text-left">By clicking on "Confirm", you hereby consent to uploading the following plan onto How2Grad's database to be made available for the general public. In the case that you wish to remove the plan that you have submitted from the database, do contact the site developers and provide more information for verification.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialogconfirm = false; dialog = false; uploadPlan()">Confirm</v-btn>
                  <v-btn color="red darken-1" text @click="dialogconfirm = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-content>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from '@/firebase';

export default {
  data () {
    return {
      plan: '',
      dialog: false,
      dialogconfirm: false,
      uploadName: '',
      details: '',
      authorName: ''
      // ,
      // modListStrArr: [[[''],['']], [[''],['']], [[''],['']], [[''],['']]]
    }
  },
  props: ['plannedModules'],
  methods: {
    uploadPlan: function() {
      if (this.authorName === '') {
        this.authorName = 'Anonymous'
      }
      this.$firestore.plans.add(
        {
          name: this.uploadName,
          description: this.details,
          author: this.authorName,
          y1s1: this.plannedModules[0][0],
          y1s2: this.plannedModules[0][1],
          y2s1: this.plannedModules[1][0],
          y2s2: this.plannedModules[1][1],
          y3s1: this.plannedModules[2][0],
          y3s2: this.plannedModules[2][1],
          y4s1: this.plannedModules[3][0],
          y4s2: this.plannedModules[3][1],
        }
      );
      this.uploadName = '';
      this.details = '';
      this.authorName = '';
    },

    getModuleCodeListStr (arr) {
      try {
        let modCodes = []
        for (let i = 0; i < arr.length; i++) {
          modCodes.push(arr[i])
        }
        return modCodes.join(', ')
      } catch {
        return ''
      }
    }
  },
  firestore() {
    return {
      plans: db.collection('plans'),
    }
  }, 
  computed: {
    modListStrArr: function () {
      let returnArr = [[[],[]], [[],[]], [[],[]], [[],[]]]
      for (let i = 0; i < this.plannedModules.length; i++) {
        for (let j = 0; j < this.plannedModules[i].length; j++) {
          // console.log(this.plannedModules[i][j])
          returnArr[i][j] = this.getModuleCodeListStr(this.plannedModules[i][j])
          // console.log(returnArr[i][j])
        }
      }
      return returnArr
    }
  }
}
</script>

<style>
</style>
