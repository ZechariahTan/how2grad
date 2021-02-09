<template>
  <v-app>
    <v-app-bar
      color="teal lighten-3"
      dark
      hide-on-scroll
      dense
      scroll-target="#scrolling-techniques-4"
    >
      <v-app-bar-nav-icon @click="drawer=true"></v-app-bar-nav-icon>

      <v-toolbar-title>DnDNotBeyond</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>  
    
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item link to="/moduleTree" id="nav-element">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/plan" id="nav-element">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Character</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      drawer: false,
      group: null,
      isHidden: false
    }
  }
}
</script>>

<style>
@import url('https://fonts.googleapis.com/css2?family=Arimo&display=swap');

#app {
  font-family: 'Arimo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  text-decoration: none;
  position: relative;
}

#nav-list {
  list-style: none;
  /* display: inline-flex; */
}

#nav {
  padding: 10px;
  text-decoration: none;
  text-align: left;
  font-size:25px;
  font-family: 'Arimo', sans-serif;
  /* margin-left: 1px; */
}

#nav-element:hover {
  color: #FF6F02;
  font-size:28px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-left: 6px;
}

#nav a.router-link-exact-active {
  color: #FF6F02;
  text-decoration: none;
}
</style>
