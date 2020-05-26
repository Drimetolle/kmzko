<template>
  <v-combobox
      v-model="model"
      :items="items"
      label="Добавьте опции"
    >
      <template v-slot:item="{ item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          placeholder="Введите название"
          @keyup.enter="edit(item)"
        ></v-text-field>
        <div v-else>
          {{ item.text }}
        </div>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn
            v-if="editing !== item"
            icon
            @click.stop.prevent="remove(item)"
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action @click.stop>
          <v-btn
            icon
            @click.stop.prevent="edit(item)"
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
import R from 'ramda'

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

  edit(item: any): void {
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

  remove(item: any): void {
    this.items.splice(this.items.indexOf(item), 1)
  }
}
</script>
