<template>
  <v-form>
    <v-container v-for="component in conveyorСomponents"
      :key="component.id"
      :id="component.id">
      <h2>{{ component.name }}</h2>
      <Field v-for="detail in component.details"
        :key="detail.id"
        :id="detail.id"
        :item="detail"
        @customivent="setField(detail.id, $event)"/>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import Field from '@/components/Field.vue'
import { Conveyor, Node, FormConveyor } from '@/types/index'

interface Data {
  conveyorСomponents: Array<Node>
  values: Map<string, string>
}

export default Vue.extend({
  data: (): Data => {
    return {
      conveyorСomponents: [
        {id: '1', name: 'Engine', details: [
          {id: '1', value: 'Engine', child: ['engine1', 'engine2']},
        ]},
        {id: '2', name: 'Tape', details: [
          {id: '1', value: 'tape1'},
          {id: '2', value: 'tape2'},
        ]},
      ],
      values: new Map(),
    }
  },
  methods: {
    setField(id: string, event: string) {
      this.values.set(id, event)
    },
  },
  components: {
    Field,
  },
})
</script>