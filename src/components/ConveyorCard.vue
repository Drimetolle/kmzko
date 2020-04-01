<template>
  <v-expansion-panel>
    <v-expansion-panel-header>{{this.conveyor.name}}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <div v-for="(node, i) in this.conveyor.nodes"
          :key="i"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{node.name}}</v-list-item-title>
            <v-list-item v-for="(detail, i) in node.details"
                :key="i"
            >
              <v-list-item-title>{{`${detail.name}: `}}{{characteristics(detail)}}</v-list-item-title>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="conveyor.nodes.length - 1 > i"/>
      </div>
      <v-img v-if="conveyor.img" 
        src="https://bad.src/not/valid"
        lazy-src="https://via.placeholder.com/300.png/09f/fff"
        contain
        max-height="300"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-btn class="mr-4" @click.prevent="submit">{{ $t('edit') }}</v-btn>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import Vue from 'vue'
import { Conveyor, Detail, States } from '@/types/index'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  props: {
    conveyor: {
      type: Object as () => Conveyor,
    },
  },
  computed: {
    components(): string {
      return this.conveyor.nodes.map(n => n.name).join(', ')
    },
  },
  methods: {
    ...mapMutations(['setConveyor', 'setState']),
    select() {
      this.$emit('select', this.conveyor.id)
    },
    details(index: number): string {
      // console.log(this.conveyor)
      return this.conveyor.nodes[index].details.map(n => n.name).join(', ')
    },
    characteristics(detail: Detail): string {
      // console.log(detail)
      return detail.characteristics.map(n => `${n.name} - ${n.value}${n.type.substring(0, 1)}`).join(', ')
    },
    submit() {
      this.$emit('selectConveyor', this.conveyor.id)
      this.setConveyor(this.conveyor)
      this.setState(States.EditConveyor)
    },
  },
})
</script>
