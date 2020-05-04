<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="#d94d33"
      dark
      clipped-right
    >
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer/>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab small>
              <v-icon>account_circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="pushTo(item)"
            >
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => {
    return {
      items: [
        { title: 'settings' },
        { title: 'purchase-history' },
        { title: 'logout' },
      ],
    }
  },
  methods: {
    pushTo({ title }: any): void {
      if(title === 'settings') this.$router.push('/settings/profile')
      else if (title === 'logout') {
        this.$store.commit('logout')
        this.$router.push('/login')
      }
      else if (title === 'purchase-history') this.$router.push('/purchase')
    },
  },
 })
</script>
