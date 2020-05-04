<template>
  <v-select 
    :items="convertValue(item.child)"
    :label="item.name"
    v-model="item.value"
    @change="() => $emit('blur', item)"
  ></v-select>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { ImplSelectElement } from '@/types/index'

const ItemProps = Vue.extend({
  props: {
    item: Object,
  },
})

@Component
export default class SelectField extends ItemProps {
  convertValue(item: Array<any>): Array<ImplSelectElement> {
    return item.map(i => new ImplSelectElement(i.name, i.name))
  }
}
</script>
