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
          tile>
          <v-list-item @click="">
            <v-list-item-content>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="">
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
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-text-field
            solo
            label="Name">
          </v-text-field>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({ })
</script>
