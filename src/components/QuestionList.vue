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
          <Field v-for="rate in questionnaire.rateList"
            :key="rate.mark"
            :item="toFieldSkelet(rate)"
            @click="focus"/>
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
import { QuestionnaireDto, RateDto, States, SelectElement, ImplSelectElement } from '@/types/index'
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
  items: Array<SelectElement> = []
  select: string = ''
  questionnaire: QuestionnaireDto = { } as any
  valid: boolean = false

  setState!: (...args: any) => void
  setQuestionnaire!: (...args: any) => void
  getFormConveyor!: (type: string) => Promise<QuestionnaireDto>
  setConveyorType!: (...args: any) => void

  async created() {
    const conveyorTypes: Array<string> = await getConveyorTypes()
    const localeItems = conveyorTypes.map(i => this.$t(i)) as Array<string>
    this.items = conveyorTypes.map(i => new ImplSelectElement(this.$t(i), i))
  }

  @AsyncLoading
  async getForm() {
    this.setConveyorType(this.select)
    this.questionnaire = await this.getFormConveyor(this.select)
  }

  submit() {
    this.setQuestionnaire(this.questionnaire)
    this.setState(States.ListOfConveyors)
  }

  focus() {
    console.log(1)
  }

  toFieldSkelet(option: any) {
    return QuestionnaireConverter.prototype.toFieldSkelet(option)
  }
}
</script>
