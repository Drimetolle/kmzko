<template>
  <v-expansion-panel>
    <v-expansion-panel-header>{{this.conveyor.name}}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <div v-for="(node, i) in this.conveyor.nodes"
          :key="i">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{node.name}}</v-list-item-title>
            <v-list-item v-for="(detail, i) in node.details"
                :key="i">
              <v-list-item-title>{{`${detail.name}: `}}{{characteristics(detail)}}</v-list-item-title>
              
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue'
import { Conveyor, Detail } from '@/types/index'

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
    details(index: number): string {
      // console.log(this.conveyor)
      return this.conveyor.nodes[index].details.map(n => n.name).join(', ')
    },
    characteristics(detail: Detail): string {
      // console.log(detail)
      return detail.characteristics.map(n => n.unit.value).join(', ')
    },
    characteristicsName(detail: Detail): string {
      // console.log(detail)
      return detail.characteristics.map(n => n.unit.name).join(', ')
    },
  },
})
</script>