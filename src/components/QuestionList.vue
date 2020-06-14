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
      <div v-if="projectIsExist" class="text-center">
        Такого проекта нет.
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
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Field from '@/components/Field.vue'
import { QuestionnaireDto, RateDto, States, SelectElement, ConveyorProjectDto } from '@/types/index'
import { saveUserQuestionnaire } from '@/utils/request/index'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import Component, { mixins } from 'vue-class-component'
import * as R from 'ramda'

@Component({
  components: {
    Field,
  },
  methods: {
    ...mapMutations(['setState', 'setQuestionnaire', 'setConveyorType']),
    ...mapActions(['getFormConveyor', 'fetchConveyors', 'fetchProjectById']),
  },
  computed: {
    ...mapGetters(['getQuestionnaire', 'getConveyorProjectId']),
  },
})
export default class QuestionList extends mixins(LoadingMixin) {
  items: Array<SelectElement> = []
  questionnaire: QuestionnaireDto = { } as any
  valid = false
  project = ''

  setState!: (...args: any) => void
  setQuestionnaire!: (...args: any) => void
  getFormConveyor!: (type: string) => Promise<QuestionnaireDto>
  setConveyorType!: (...args: any) => void
  fetchProjectById!: (id: string) => Promise<ConveyorProjectDto>
  getQuestionnaire!: QuestionnaireDto
  getConveyorProjectId!: string

  @AsyncLoading
  async created(): Promise<void> {
    try {
      await this.fetchProjectById(this.$route.params.id)
    }
    catch(error) {
      return
    }

    this.questionnaire = R.clone(this.getQuestionnaire)
    this.project = this.getConveyorProjectId
  }

  submit(): void {
    this.questionnaire.rateList.map(r => this.$delete(r, 'child'))

    this.setQuestionnaire(this.questionnaire)
    this.setState(States.ListOfConveyors)
  }

  async unfocus(item: QuestionnaireDto): Promise<void> {
    await saveUserQuestionnaire(this.project, this.questionnaire)
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

  get projectIsExist(): boolean {
    return this.loaded && R.isEmpty(this.questionnaire)
  }
}
</script>
