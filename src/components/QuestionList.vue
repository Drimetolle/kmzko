<template>
  <v-form v-model="valid">
    <v-container>
      <v-row
          align="center"
          justify="start"
      >
        <v-col
            cols="10"
            md="24"
        >
          <v-select
            :items="items"
            v-model="select"
            label="select"
            @change="getForm"
          >
          </v-select>
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
          <v-btn v-if="select !== '' && loaded" class="mr-4" @click.prevent="submit">{{ $t('submit') }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Field from '@/components/Field.vue'
import { FormConveyor, States } from '@/types/index'

interface SelectElement {
  text: any
  value: string
}

class ImplSelectElement implements SelectElement {
  text: any
  value: string

  constructor(text: any, value: string) {
    this.text = text
    this.value = value
  }
}

interface Data {
  conveyorСomponents: Array<FormConveyor>
  items: Array<SelectElement>
  select: string,
  values: Map<string, string>
  loaded: boolean
  valid: boolean
}

export default Vue.extend({
  data: (): Data => {
    return {
      conveyorСomponents: [],
      items: [],
      select: '',
      values: new Map(),
      loaded: true,
      valid: false,
    }
  },
  async created() {
    const conveyorTypes: Array<string> = await this.getConveyorType
    const localeItems = conveyorTypes.map(i => this.$t(i)) as Array<string>
    this.items = conveyorTypes.map(i => new ImplSelectElement(this.$t(i), i))
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
