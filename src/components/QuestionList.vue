<template>
  <div>
    <v-select
        :items="items"
        v-model="select"
        label="select"
        @change="getForm"/>
      <Field v-for="component in conveyorСomponents"
        :key="component.id"
        :id="component.id"
        :item="component"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Field from '@/components/Field.vue'
import { GET_FORM_CONVEYOR } from 'actions/configurator'
import { FormConveyor } from '@/types/index'

interface Data {
  conveyorСomponents: Array<FormConveyor>
  items: Array<string>
  select: string
}

export default Vue.extend({
  name: 'questionlist',
    data: (): Data => {
    return {
      conveyorСomponents: [],
      items: ['Ленточный', 'Скребковый'],
      select: '',
    }
  },
  methods: {
    async getForm() {
      const newConveyorСomponents = await this.$store.dispatch(GET_FORM_CONVEYOR, { type: this.select })
      this.conveyorСomponents = newConveyorСomponents
    },
  },
  components: {
    Field,
  },
})
</script>