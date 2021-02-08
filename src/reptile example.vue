<template>
  <div id="app">
    <div>
      <input type="text"
        class="grey"
        v-model="newReptile"
        @keyup.enter="addReptile">
      <button  @click="addReptile">
        Add Reptile
      </button>
    </div>
    <ul class="reptileList">
      <li v-bind:key="reptile" v-for="reptile in reptiles" >
        {{ reptile.name }} -
        <button @click="deleteReptile(reptile)">
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { db } from './firebase';

  export default {
    name: 'app',
    data() {
      return {
        reptiles: [],
        newReptile: ''
      }
    },
    firestore() {
      return {
        reptiles: db.collection('plans'),
      }
    },
    methods: {
      addReptile: function() {
        this.$firestore.reptiles.add(
          {
            name: this.newReptile,
            timestamp: new Date()
          }
        );
        this.newReptile = '';
      },
      deleteReptile: function(reptile) {
        this.$firestore.reptiles.doc(reptile['.key']).delete();
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .reptileList {
    list-style: none;
  }
</style>