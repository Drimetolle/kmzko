<template>
  <v-card>
    <v-card-title class="headline">Unlimited music now</v-card-title>
    <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>
    <v-card-actions>
      <v-btn text>Listen Now</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['conveyor']
})
</script>