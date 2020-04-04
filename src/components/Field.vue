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
    v-model="value"
    @input="changeValue"
  >
  </v-color-picker>
  <v-checkbox
    v-else-if="valueOf(item) === 'checkBox'"
    v-model="value"
    :label="`${item.name}`"
    @click.native="changeValue"
  >

  </v-checkbox>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormConveyor, ImplSelectElement, FieldSkelet } from '@/types/index'
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
    values: {
      type: Map,
    },
    converter: {
      type: Object as () => FieldConverter,
    },
  },
  data: () => {
    return {
      value: '',
    }
  },
  mounted() {
    this.value = this.item.value
    const model = this.converter.toModel({ id: this.item.id, value: this.value })
    this.values.set(model.id, model)
  },
  methods: {
    changeValue() {
      const model = this.converter.toModel({ id: this.item.id, value: this.value })
      this.values.set(model.id, model)
    },
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
