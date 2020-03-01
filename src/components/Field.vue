<template>
  <v-text-field
    :label="item.value"
    :placeholder="item.placeholder"
    ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue';
import { FormConveyor } from '@/types/index';

export default Vue.extend({
  props: {
    item: {
      type: Object as () => FormConveyor,
    },
  },
});
</script>
