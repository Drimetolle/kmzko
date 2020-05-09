<template>
  <v-row
    align="center"
    justify="start"
  >
    <v-col
      cols="10"
      md="24"
    >
      <div class="text-center">
        <v-progress-circular
          v-if="!loaded"
          indeterminate
          color="primary"
          size="50"
        ></v-progress-circular>
      </div>
      <v-form v-model="valid">
        <v-container v-if="show">
          <h4>{{questionnaire.name}}</h4>
          <Field v-for="rate in questionnaire.rateList"
            :key="rate.mark"
            :item="convertToFieldSkelet(rate)"
            @unfocus="unfocus"
          />
          <v-btn class="mr-4" @click.prevent="submit">{{ $t('submit') }}</v-btn>
        </v-container>
        <v-container class="text-center" v-else-if="select !== '' && loaded">
          К сожалению опросных листов для такого типа конвейера нет
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapMutations, mapActions, mapState } from 'vuex'
import Field from '@/components/Field.vue'
import { QuestionnaireDto, RateDto, States, SelectElement } from '@/types/index'
import { saveQuestionnaire } from '@/utils/request/index'
import LoadingMixin from '@/mixin/loading.mixin'
import Component, { mixins } from 'vue-class-component'

@Component({
  components: {
    Field,
  },
  methods: {
    ...mapMutations(['setState', 'setQuestionnaire', 'setConveyorType']),
    ...mapActions(['getFormConveyor', 'fetchConveyors']),
  },
  computed: {
    ...mapState({
      getQuestionnaire: ({ configurator }: any) => configurator.questionnaire,
    }),
  },
})
export default class extends mixins(LoadingMixin) {
  items: Array<SelectElement> = []
  select = ''
  questionnaire: QuestionnaireDto = { } as any
  valid = false

  setState!: (...args: any) => void
  setQuestionnaire!: (...args: any) => void
  getFormConveyor!: (type: string) => Promise<QuestionnaireDto>
  setConveyorType!: (...args: any) => void
  getQuestionnaire!: QuestionnaireDto

  created(): void {
    this.questionnaire = this.getQuestionnaire
  }

  submit(): void {
    this.questionnaire.rateList.map(r => this.$delete(r, 'child'))

    this.setQuestionnaire(this.questionnaire)
    this.setState(States.ListOfConveyors)
  }

  async unfocus(item: QuestionnaireDto): Promise<void> {
    await saveQuestionnaire(this.questionnaire)
  }

  convertToFieldSkelet(rate: RateDto): RateDto {
    if(rate.possibleRateValues) {
      this.$set(rate, 'child', rate.possibleRateValues)
      this.$delete(rate, 'possibleRateValues')
    }
    return rate
  }

  get show(): boolean {
    return this.loaded && Object.keys(this.questionnaire).length > 0
  }
}
</script>
