<template>
  <v-combobox
      v-model="model"
      :items="items"
      label="Search for an option"
    >
      <template v-slot:item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <div v-else>
          {{ item.text }}
        </div>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn
            icon
            @click.stop.prevent="edit(index, item)"
          >
            <v-icon>{{ editing !== item ? 'create' : 'done' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

const Props = Vue.extend({
  props: {
    items: Array as () => any,
  },
})

@Component
export default class CompletableSelect extends Props {
  editing = null
  index = -1
  model = null

  created(): void {
    this.$set(this.items[0], 'text', '')
    this.editing = this.items[0]
  }

  edit(index: number, item: any): void {
    if (item.text !== '') {
      if (this.editing === item) {
        if (this.items[0].text !== '') {
          const el = { text: '' }
          this.items.unshift(el)
        }
        this.editing = this.items[0]
      }
      else {
        this.editing = item
      }
    }
  }
}
</script>
