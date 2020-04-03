<template>
  <v-text-field
    v-if="valueOf(item) === 'textBox'"
    :label="item.name"
    :placeholder="item.placeholder"
    v-model="value"
    @input="changeValue"
  ></v-text-field>
  <v-select 
    v-else-if="valueOf(item) === 'selectBox'"
    :items="convertValue(item.child)"
    :label="item.name"
    v-model="value"
    @input="changeValue"
  ></v-select>
  <v-color-picker
    v-else-if="valueOf(item) === 'colorPicker'"
    v-model="value">

  </v-color-picker>
  <v-checkbox
    v-else-if="valueOf(item) === 'checkBox'"
    v-model="value"
  >
    <template v-slot:label>
      <div @click.stop="">
        {{ item.name }}
      </div>
    </template>
  </v-checkbox>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormConveyor, ImplSelectElement } from '@/types/index'

function parseBoolean(str: string): boolean {
  return /^true$|^false$/i.test(str)
}

function parseColorHex(str: string): boolean {
  return /^#[0-9a-f]{3,6}$/i.test(str)
}

export default Vue.extend({
  props: {
    item: {
      type: Object,
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
    convertValue(item: Array<any>): Array<ImplSelectElement> {
      return item.map(i => new ImplSelectElement(i.name, i.name))
    },
    valueOf(value: any): string {
      if (parseBoolean(value.value)) {
        return 'checkBox'
      }
      // if (parseColorHex(value.value)) {
      //   return 'colorPicker'
      // }
      if ('child' in value) {
        return 'selectBox'
      }
      else {
        return 'textBox'
      }
    },
  },
})
</script>
