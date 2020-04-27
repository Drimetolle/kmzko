<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="2"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-list-item @click="setPage('Bio')">
            <v-list-item-content>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="setPage('PurchaseHistory')">
            <v-list-item-content>
              <v-list-item-title>History</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <component :is="page" @saveUserBio="userSnackbar.visible = true">
          <router-view/>
        </component> 
        <v-snackbar
          v-model="userSnackbar.visible"
          right
        >
          {{ userSnackbar.text }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import Bio from '@/components/profile/Bio'
import PurchaseHistory from '@/components/profile/PurchaseHistory'

@Component({
  components: {
    Bio,
    PurchaseHistory,
  },
})
export default class Profile extends Vue {
  page: string = 'Bio'
  userSnackbar = {
    text: 'Информация сохранена',
    visible: false,
  }

  toggleUserSnackbar() {
    this.userSnackbar.visible = true
  }

  setPage(target: string) {
    this.page = target
  }
}
</script>
