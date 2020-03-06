<template>
  <div>
    <v-row dense>
      <v-col cols="12" v-for="elem in conveyors"
        :key="elem.id"
        :id="elem.id">
        <ConveyorCard 
          :conveyor="elem"/>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Conveyor } from '@/types/index'
import ConveyorCard from '@/components/ConveyorCard'
export default Vue.extend({
  name: 'listofconveyors',
  props: {
    conveyors: {
      type: Array,
    },
  },
  components: {
    ConveyorCard,
  },
})
</script>