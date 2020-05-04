<template>
  <v-text-field
    :label="item.name"
    :placeholder="item.placeholder"
    v-model="item.value"
    @blur="() => $emit('blur', item)"
  ></v-text-field>
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
export default class TextField extends ItemProps {

}
</script>
