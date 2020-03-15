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
        :values="values"/>
    <v-btn class="mr-4" @click="submit">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Field from '@/components/Field.vue'
import { GET_FORM_CONVEYOR } from 'actions/configurator'
import { FormConveyor } from '@/types/index'
import { States } from '@/types/states'

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
      items: [],
      select: '',
      values: new Map(),
    }
  },
  async created() {
    this.items = await this.getConveyorType
  },
  methods: {
    ...mapMutations(['setState']),
    ...mapActions([GET_FORM_CONVEYOR]),
    async getForm() {
      const newConveyorСomponents = await this.$store.dispatch(GET_FORM_CONVEYOR, { type: this.select })
      this.conveyorСomponents = newConveyorСomponents
    },
    submit() {
      this.setState(States.ListOfConveyors)
      // console.log(JSON.stringify(Object.fromEntries(this.values)))
    },
  },
  computed: {
    ...mapGetters(['getConveyorType']),
  },
  components: {
    Field,
  },
})
</script>