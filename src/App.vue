<template>
   <div id="app">
      <div id="nav">
        <router-link to="/login">Login</router-link> |
        <router-link to="/registration">Registration</router-link> |
        <router-link to="/configurator">Configurator</router-link> |
        <router-link to="/questionnaire">Questionnaire</router-link> |
        <router-link to="/">Home</router-link>
      </div>
      <component :is="layout">
        <router-view/>
      </component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import MainLayout from '@/layouts/MainLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

@Component({
  components: {
    EmptyLayout,
    MainLayout,
  },
})
export default class App extends Vue {

  get layout(): string {
    return (this.$route.meta.layout || 'empty') + '-layout'
  }
}
</script>

<style>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav {
  z-index: 45;
  position: fixed;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
