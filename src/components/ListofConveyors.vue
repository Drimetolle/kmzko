<template>
  <div>
    <ConveyorCard v-for="elem in conveyors"
      :key="elem.id"
      :id="elem.id"
      :conveyor="elem"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ConveyorCard from '@/components/ConveyorCard'
export default Vue.extend({
  name: 'listofconveyors',
  props: ['conveyors'],
  components: {
    ConveyorCard
  },
})
</script>