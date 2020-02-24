<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login">Login</router-link> |
      <router-link to="/registration">Registration</router-link> |
      <router-link to="/">Configurator</router-link>
    </div>
    <component :is="layout">
        <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
    computed: {
        layout () {
            return (this.$route.meta.layout || 'empty') + '-layout'
        }
    },
    components: {
        EmptyLayout, MainLayout
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
