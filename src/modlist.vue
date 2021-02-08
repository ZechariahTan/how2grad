<template>
  <v-row>
    <v-dialog v-model="dialog" scrollable max-width="750px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-4" color="grey lighten-1" x-large rounded v-bind="attrs" v-on="on">
          Load Plan
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Select Study Plan</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-left" style="height: 500px;">
                <div>
                Sample Computer Science Major Plan
                <v-btn v-on:click="loadComSciPlan">Select</v-btn>
                </div><br>
                <div>
                Sample Computer Science Major (University Town College Programme) Plan
                <v-btn v-on:click="loadComSciUtownPlan">Select</v-btn>
                </div><br>
                <div>
                Sample Economics and Philosophy Double Major Plan
                <v-btn v-on:click="loadECBAPlan">Select</v-btn>
                </div><br>
                <div>
                Sample Business Administration Major Plan
                <v-btn v-on:click="loadBizPlan">Select</v-btn>
                </div><br>
                <div>
                Sample FASS Economics Major Plan
                <v-btn v-on:click="loadEconsPlan">Select</v-btn>
                </div><br>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      plan: '',
      dialog: false,
      y1s1Plan: [],
      y1s2Plan: [],
      y2s1Plan: [],
      y2s2Plan: [],
      y3s1Plan: [],
      y3s2Plan: [],
      y4s1Plan: [],
      y4s2Plan: []
    }
  },
  methods: {
    emitData () {
      this.$emit('slectedPlan', this.y1s1Plan, this.y1s2Plan, this.y2s1Plan, this.y2s2Plan, this.y3s1Plan, this.y3s2Plan, this.y4s1Plan, this.y4s2Plan)
    },
    loadComSciUtownPlan () {
      // Semester 1
      this.y1s1Plan = ['CS1231S', 'CS1010', 'ES1103', 'UTC1117', 'MA1521']
      this.y1s2Plan = ['CS2030', 'CS2100', 'CS2040S', 'UTW1001Z', 'UTC2101']
      // Semester 2
      this.y2s1Plan = ['MA1101R', 'CS2103T', 'CS2106', 'CS2101', 'UTC2105']
      this.y2s2Plan = ['ST2334', 'ES2660', 'CS3230', 'UTW2001Q', 'CS2105']
      // Semester 3
      this.y3s1Plan = ['CS2104', 'CS2107', 'CS3210', 'CS3220', 'CS3223']
      this.y3s2Plan = ['CS3233', 'CS3234', 'CS3244', 'CS3241', 'CS3236']
      // Semester 4
      this.y4s1Plan = ['CS4212', 'CS4226', 'CS5224', 'CS5223', 'CS6207']
      this.y4s2Plan = ['CS4225', 'CS4234', 'CS6270', 'CS6285', 'CS6234']
      this.emitData()
    },
    loadComSciPlan () {
      // Semester 1
      this.y1s1Plan = ['CS1231S', 'CS1010', 'ES1103', 'GET1019', 'MA1521']
      this.y1s2Plan = ['CS2030', 'CS2100', 'CS2040S', 'GEQ1917', 'GEH1022']
      // Semester 2
      this.y2s1Plan = ['MA1101R', 'CS2103T', 'CS2106', 'CS2101', 'GEM2027']
      this.y2s2Plan = ['ST2334', 'ES2660', 'CS3230', 'GES1038', 'CS2105']
      // Semester 3
      this.y3s1Plan = ['CS2104', 'CS2107', 'CS3210', 'CS3220', 'CS3223']
      this.y3s2Plan = ['CS3233', 'CS3234', 'CS3244', 'CS3241', 'CS3236']
      // Semester 4
      this.y4s1Plan = ['CS4212', 'CS4226', 'CS5224', 'CS5223', 'CS6207']
      this.y4s2Plan = ['CS4225', 'CS4234', 'CS6270', 'CS6285', 'CS6234']
      this.emitData()
    },
    loadBizPlan () {
      // Semester 1
      this.y1s1Plan = ['MNO2705', 'GET1029', 'MNO1706', 'DAO1704', 'GER1000']
      this.y1s2Plan = ['BSP3701', 'BSP1703', 'DAO2702', 'GEQ1000', 'GET1050']
      // Semester 2
      this.y2s1Plan = ['ES2002', 'BSP2701', 'GES1038', 'EC1301', 'GEK2036']
      this.y2s2Plan = ['ACC1701', 'GEH1013', 'BSP1702', 'MKT1705', 'MNO1706']
      // Semester 3
      this.y3s1Plan = ['FIN2704', 'DAO2703', 'FSP4003', 'QF3101', 'MKT1705']
      this.y3s2Plan = ['FIN3701', 'FIN4719', 'MKT3702']
      // Semester 4
      this.y4s1Plan = ['FIN4717']
      this.y4s2Plan = []
      this.emitData()
    },
    loadECBAPlan () {
      // Semester 1
      this.y1s1Plan = ['CH1101E', 'GET1029', 'EC1101E', 'FAS1101', 'GER1000']
      this.y1s2Plan = ['EC2101', 'GET1028', 'CFG1002', 'GEQ1000', 'GET1050']
      // Semester 2
      this.y2s1Plan = ['EC2102', 'EC2104', 'GES1038', 'PH2211', 'GEK2036']
      this.y2s2Plan = ['EC2303', 'GEH1013', 'EC1301', 'EC2205', 'EC2104']
      // Semester 3
      this.y3s1Plan = ['EC3303', 'PH2243', 'PE3101P', 'EC3305', 'EC2303']
      this.y3s2Plan = ['EC3394', 'EC3303', 'PH2242', 'PH3201', 'GES1041']
      // Semester 4
      this.y4s1Plan = []
      this.y4s2Plan = []
      this.emitData()
    },
    loadEconsPlan () {
      // Semester 1
      this.y1s1Plan = ['EC1101E', 'GL1101E', 'EC2303', 'GER1000', 'UTW1001W', 'CFG1002']
      this.y1s2Plan = ['EC2101', 'SE1101E', 'UTC1102G', 'MA1101R', 'MA1102R', 'FAS1102']
      // Semester 2
      this.y2s1Plan = ['EC2102', 'EC3101', 'EC3303', 'GET1050', 'NM1101E', 'UTS2100']
      this.y2s2Plan = ['EC3102', 'EC3333', 'UTC2102', 'UTW2001Q', 'NM2101']
      // Semester 3
      this.y3s1Plan = ['EL1101E', 'NM2303', 'EC3304', 'EC3332', 'EC3303']
      this.y3s2Plan = ['EC4332', 'EC4304', 'NM3215', 'GES1035']
      // Semester 4
      this.y4s1Plan = ['EC4333', 'NM3217', 'NM2220', 'EC4307']
      this.y4s2Plan = []
      this.emitData()
    }
  }
}
</script>

<style>
</style>
