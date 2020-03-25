<template>
  <v-form>
    <v-select
      :items="items"
      v-model="select"
      label="select"
      @change="getForm"
    />
    <div class="text-center">
      <v-progress-circular
        v-if="!loaded"
        indeterminate
        color="primary"
        size="50"
      ></v-progress-circular>
    </div>
    <Field v-for="component in conveyorСomponents"
      :key="component.mark"
      :id="component.mark"
      :item="component"
      :values="values"/>
    <v-btn v-if="select !== '' && loaded" class="mr-4" @click.prevent="submit">submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Field from '@/components/Field.vue'
import { GET_FORM_CONVEYOR, SET_STATE, GET_CONVEYOR_TYPE } from 'actions/configurator'
import { FormConveyor } from '@/types/index'
import { States } from '@/types/states'

interface Data {
  conveyorСomponents: Array<FormConveyor>
  items: Array<string>
  select: string,
  values: Map<string, string>
  loaded: boolean
}

export default Vue.extend({
  name: 'questionlist',
  data: (): Data => {
    return {
      conveyorСomponents: [],
      items: [],
      select: '',
      values: new Map(),
      loaded: true,
    }
  },
  async created() {
    this.items = await this.getConveyorType
  },
  methods: {
    ...mapMutations(['setState', 'setQuestionnaire']),
    ...mapActions(['getFormConveyor', 'fetchConveyors']),
    async getForm() {
      this.loaded = false
      const newConveyorСomponents = await this.getFormConveyor({ type: this.select })
      this.conveyorСomponents = newConveyorСomponents
      this.loaded = true
    },
    submit() {
      this.setQuestionnaire(this.values)
      this.setState(States.ListOfConveyors)
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
