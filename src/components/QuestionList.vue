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
            :item="toFieldSkelet(component)"
            :converter="getConverter"
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
import { FormConveyor, States, SelectElement, ImplSelectElement } from '@/types/index'
import { getConveyorTypes } from '@/utils/request/index'
import QuestionnaireConverter from '@/utils/questionnaireConverter'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import Component, { mixins } from 'vue-class-component'

@Component({
  components: {
    Field,
  },
  methods: {
    ...mapMutations(['setState', 'setQuestionnaire', 'setConveyorType']),
    ...mapActions(['getFormConveyor', 'fetchConveyors', 'getQuestionnaire']),
  },
})
export default class extends mixins(LoadingMixin) {
  conveyorСomponents: Array<FormConveyor> = []
  items: Array<SelectElement> = []
  select: string = ''
  values: Map<string, string> = new Map()
  valid: boolean = false

  setState!: (...args: any) => void
  setQuestionnaire!: (...args: any) => void
  getFormConveyor!: (type: string) => Promise<Array<FormConveyor>>
  setConveyorType!: (...args: any) => void

  async created() {
    const conveyorTypes: Array<string> = await getConveyorTypes()
    const localeItems = conveyorTypes.map(i => this.$t(i)) as Array<string>
    this.items = conveyorTypes.map(i => new ImplSelectElement(this.$t(i), i))
  }

  @AsyncLoading
  async getForm() {
    this.setConveyorType(this.select)
    const newConveyorСomponents = await this.getFormConveyor(this.select)
    this.conveyorСomponents = newConveyorСomponents
  }

  submit() {
    this.setQuestionnaire(this.values)
    this.setState(States.ListOfConveyors)
  }

  toFieldSkelet(option: any) {
    return QuestionnaireConverter.prototype.toFieldSkelet(option)
  }

  get getConverter(): QuestionnaireConverter {
    return new QuestionnaireConverter()
  }
}
</script>
