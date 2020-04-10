<template>
  <v-text-field
    v-if="valueOf(item) === 'textBox'"
    :label="item.name"
    :placeholder="item.placeholder"
    v-model="item.value"
  ></v-text-field>
  <v-select 
    v-else-if="valueOf(item) === 'selectBox'"
    :items="convertValue(item.child)"
    :label="item.name"
    v-model="item.value"
  ></v-select>
  <div
    v-else-if="valueOf(item) === 'colorPicker'">
    <p>{{ item.name }}</p>
    <v-color-picker
      v-model="item.value"
    >
    </v-color-picker>
  </div>
  <v-checkbox
    v-else-if="valueOf(item) === 'checkBox'"
    v-model="item.value"
    :label="`${item.name}`"
  >
  </v-checkbox>
</template>

<script lang="ts">
import Vue from 'vue'
import { ImplSelectElement, FieldSkelet } from '@/types/index'
import FieldConverter from '@/utils/fieldConverter'

function parseBoolean(str: string): boolean {
  return /^true$|^false$/i.test(str)
}

function parseColorHex(str: string): boolean {
  return /^#[0-9a-f]{3,6}$/i.test(str)
}

export default Vue.extend({
  props: {
    item: {
      type: Object as () => FieldSkelet,
    },
  },
  methods: {
    convertValue(item: Array<any>): Array<ImplSelectElement> {
      return item.map(i => new ImplSelectElement(i.name, i.name))
    },
    valueOf(value: any): string {
      if (parseBoolean(value.value)) {
        return 'checkBox'
      }
      if (parseColorHex(value.value)) {
        return 'colorPicker'
      }
      if (!!value.child) {
        return 'selectBox'
      }
      else {
        return 'textBox'
      }
    },
  },
})
</script>
