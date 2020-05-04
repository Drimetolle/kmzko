<template>
  <div>
    <p>{{ item.name }}</p>
    <v-color-picker
      v-model="item.value"
      @change="() => $emit('blur', item)"
    >
    </v-color-picker>
  </div>
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
export default class ColorPickerField extends ItemProps {

}
</script>
