<template>
  <v-text-field
    v-if="!!!item.child"
    :label="item.value"
    :placeholder="item.placeholder"
    ></v-text-field>
    <v-select v-else-if="item.child"
          :items="item.child"
          :label="item.value"
      ></v-select>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormConveyor } from '@/types/index'

export default Vue.extend({
  props: {
    item: {
      type: Object as () => FormConveyor,
    },
  },
})
</script>
