<template>
  <v-card>
    <v-card-title class="headline">{{this.conveyor.name}}</v-card-title>  
    <v-card-subtitle>{{components}}</v-card-subtitle> 
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Conveyor } from '@/types/index'

export default Vue.extend({
  props: {
    conveyor: {
      type: Object as () => Conveyor,
    },
  },
  computed: {
    components(): string {
      return this.conveyor.components.join(', ')
    },
  },
})
</script>