<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="#d94d33"
      dark
      clipped-right
    >
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <!-- <v-footer
      color="#d94d33"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer> -->
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({ })
</script>
