<template>
  <div>
    <v-row v-if="conveyors.length" dense>
      <v-col cols="12" v-for="elem in conveyors"
        :key="elem.id"
        :id="elem.id">
        <ConveyorCard 
          :conveyor="elem"/>
      </v-col>
    </v-row>
    <p v-else-if="!conveyors.length">Подходящие конвейеры не найдены</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ConveyorLight } from '@/types/index'
import ConveyorCard from '@/components/ConveyorCard'

interface Data {
  conveyors: Array<ConveyorLight>
}

export default Vue.extend({
  data: (): Data => {
    return {
      conveyors: [],
    }
  },
  mounted() {
    this.conveyors = [
        {id: '1', name: 'conveyor1', components: ['engine', 'tape']},
        {id: '2', name: 'conveyor2', components: ['engine', 'tape']},
      ]
  },
  components: {
    ConveyorCard,
  },
})
</script>