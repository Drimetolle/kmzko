<template>
  <v-checkbox
    v-model="item.value"
    :label="item.name"
    @change="() => $emit('blur', item)"
  >
  </v-checkbox>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

const ItemProps = Vue.extend({
  props: {
    item: Object,
  },
})

@Component
export default class CheckboxField extends ItemProps {

}
</script>
