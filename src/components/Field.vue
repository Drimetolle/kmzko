<template>
  <v-text-field
    v-if="!!!item.child"
    :label="item.name"
    :placeholder="item.placeholder"
    v-model="value"
    @input="changeValue"
    ></v-text-field>
  <v-select v-else-if="item.child"
    :items="item.child"
    :label="item.name"
    v-model="value"
    @input="changeValue"
    ></v-select>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormConveyor } from '@/types/index'

export default Vue.extend({
  props: {
    item: {
      type: Object ,
    },
    values: {
      type: Map,
    },
  },
  data: () => {
    return {
      value: '',
    }
  },
  mounted() {
    this.value = this.item.value
    this.values.set(this.item.type, this.value)
  },
  methods: {
    changeValue() {
      this.values.set(this.item.type, this.value)
    },
  },
})
</script>
