<template>
  <v-expansion-panel>
    <v-expansion-panel-header>{{ this.conveyor.name }}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <div v-for="(node, i) in this.conveyor.nodes"
          :key="i"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{ node.name }}</v-list-item-title>
            <v-list-item v-for="(detail, i) in node.details"
              :key="i"
            >
              <v-list-item-title>{{ detail.name }} {{ detail.count | piece }}: {{ characteristics(detail) | characteristic }}</v-list-item-title>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="conveyor.nodes.length - 1 > i"/>
      </div>
      <v-divider class="pb-2" v-if="conveyor.img"/>
      <v-skeleton-loader
        class="mx-auto"
        max-width="500"
        type="image"
        v-if="conveyor.img" 
      >
        <v-img 
          :src="conveyor.img"
          contain
          max-height="300"
        >
        </v-img>
      </v-skeleton-loader>
      <v-btn class="mr-4" @click.prevent="submit">{{ $t('edit') }}</v-btn>
      <v-btn class="mr-4" @click.prevent="selectOptions">{{ $t('options') }}</v-btn>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue'
import { Conveyor, Detail, States } from '@/types/index'
import { mapMutations } from 'vuex'
import { CharacteristicDto } from '@/types/index'
import Component from 'vue-class-component'

const Props = Vue.extend({
  props: {
    conveyor: Object as () => Conveyor,
  },
})

@Component({
  methods: {
    ...mapMutations(['setConveyor', 'setState']),
  },
})
export default class ConveyorCard extends Props {
  setConveyor!: (...args: any) => void
  setState!: (...args: any) => void

  select(): void {
    this.$emit('select', this.conveyor.id)
  }

  details(index: number): string {
    return this.conveyor.nodes[index].details.map(n => n.name).join(', ')
  }

  characteristics(detail: Detail): Array<CharacteristicDto> {
    return detail.characteristics
  }

  submit(): void {
    this.$emit('selectConveyor', this.conveyor.id)
    this.setConveyor(this.conveyor)
    this.setState(States.EditConveyor)
  }

  selectOptions(): void {
    this.$emit('selectConveyor', this.conveyor.id)
    this.setConveyor(this.conveyor)
    this.setState(States.AddOptions)
  }

  get components(): string {
    return this.conveyor.nodes.map(n => n.name).join(', ')
  }
}
</script>
