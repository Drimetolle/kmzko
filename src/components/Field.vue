<template>
  <component 
    :is="valueOf(item)" 
    v-model="item.value" 
    :item="item" 
    @blur="blur"
  >
  </component>
</template>

<script lang="ts">
import Vue from 'vue'
import TextField from '@/components/vuetifyWrappers/TextField'
import SelectField from '@/components/vuetifyWrappers/SelectField'
import CheckboxField from '@/components/vuetifyWrappers/CheckboxField'
import ColorPickerField from '@/components/vuetifyWrappers/ColorPickerField'
import { FieldSkelet } from '@/types/index'

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
    blur(): void {
      console.log(1)
      this.$emit('unfocus', this.item)
    },
    valueOf(value: FieldSkelet): string {
      if (parseBoolean(value.value)) {
        return 'CheckboxField'
      }
      if (parseColorHex(value.value)) {
        return 'ColorPickerField'
      }
      if (!!value.child) {
        return 'SelectField'
      }
      else {
        return 'TextField'
      }
    },
  },
  components: {
    CheckboxField,
    ColorPickerField,
    SelectField,
    TextField,
  },
})
</script>
