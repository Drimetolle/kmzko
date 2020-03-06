<template>
  <v-form>
    <v-select
        :items="items"
        v-model="select"
        label="select"
        @change="getForm"/>
      <Field v-for="component in conveyorСomponents"
        :key="component.id"
        :id="component.id"
        :item="component"
        @customivent="setField(component.id, $event)"/>
    <v-btn class="mr-4" @click="submit">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import Field from '@/components/Field.vue'
import { GET_FORM_CONVEYOR } from 'actions/configurator'
import { FormConveyor } from '@/types/index'

interface Data {
  conveyorСomponents: Array<FormConveyor>
  items: Array<string>
  select: string,
  values: Map<string, string>
}

export default Vue.extend({
  name: 'questionlist',
  data: (): Data => {
    return {
      conveyorСomponents: [],
      items: ['Ленточный', 'Скребковый'],
      select: '',
      values: new Map(),
    }
  },
  methods: {
    async getForm() {
      const newConveyorСomponents = await this.$store.dispatch(GET_FORM_CONVEYOR, { type: this.select })
      this.conveyorСomponents = newConveyorСomponents
    },
    submit() {
      // console.log(this.values)
    },
    setField(id: string, event: string) {
      this.values.set(id, event)
    },
  },
  components: {
    Field,
  },
})
</script>