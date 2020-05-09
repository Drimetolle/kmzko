<template>
  <div>
    <div class="text-center">
      <v-progress-circular
        v-if="!loaded"
        indeterminate
        color="primary"
        size="50"
      ></v-progress-circular>
    </div>
    <v-row v-if="conveyors.length" dense>
      <v-expansion-panels multiple>
        <v-col cols="12" v-for="elem in conveyors"
          :key="elem.id"
          :id="elem.id"
        >
          <ConveyorCard 
            :conveyor="elem"
          />
        </v-col>
      </v-expansion-panels>
    </v-row>
    <div class="text-center" 
      v-else-if="!conveyors.length && loaded"
    >
      <p>Подходящие конвейеры не найдены. Составить конвейер по шаблону?</p>
      <a @click.prevent="redirect">Создать</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Conveyor, QuestionnaireDto } from '@/types/index'
import ConveyorCard from '@/components/ConveyorCard'
import { mapMutations, mapActions, mapState } from 'vuex'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import Component, { mixins } from 'vue-class-component'

@Component({
  components: {
    ConveyorCard,
  },
  methods: {
    ...mapActions(['fetchConveyors']),
    ...mapMutations(['setState']),
  },
  computed: {
    ...mapState({
      getQuestionnaire: ({ configurator }: any) => configurator.questionnaire,
      getConveyors: ({ configurator }: any) => configurator.conveyor,
    }),
  },
})
export default class extends mixins(LoadingMixin) {
  conveyors: Array<Conveyor> = []

  fetchConveyors!: (payload: QuestionnaireDto) => Promise<Array<Conveyor>>
  setState!: (...args: any) => void
  getConveyors!: Array<Conveyor>
  getQuestionnaire!: QuestionnaireDto

  @AsyncLoading
  async mounted(): Promise<void> {
    this.conveyors = await this.fetchConveyors(this.getQuestionnaire)
  }

  redirect(): void {
    this.setState('edit-conveyor')
  }
}
</script>
