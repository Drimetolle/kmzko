<template>
  <v-card @click="select">
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
      return this.conveyor.nodes.map(n => n.name).join(', ')
    },
  },
  methods: {
    select() {
      this.$emit('select', this.conveyor.id)
    },
  },
})
</script>