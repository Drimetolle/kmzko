<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
    position="fixed"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">OVERLINE</div>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>{{price | currency}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn color="#d94d33" dark>Сделать заказ</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'basket',
  props: {
    price: Number,
  },
  methods: {

  },
})
</script>
