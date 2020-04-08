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
import Vue from 'vue'
import { Conveyor, QuestionnaireDto } from '@/types/index'
import ConveyorCard from '@/components/ConveyorCard'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import Component, { mixins } from 'vue-class-component'
import QuestionnaireMapper from '@/utils/mapper/QuestionnaireMapper'

const mapper: QuestionnaireMapper = new QuestionnaireMapper()

@Component({
  components: {
    ConveyorCard,
  },
  methods: {
    ...mapActions(['fetchConveyors']),
    ...mapMutations(['setState']),
  },
  computed: {
    ...mapGetters(['getConveyors', 'getQuestionnaire']),
  },
})
export default class extends mixins(LoadingMixin) {
  conveyors: Array<Conveyor> = []

  fetchConveyors!: (payload: QuestionnaireDto) => Promise<Array<Conveyor>>
  setState!: (...args: any) => void
  getConveyors!: Array<Conveyor>
  getQuestionnaire!: Map<string, string>

  @AsyncLoading
  async mounted() {
    this.conveyors = await this.fetchConveyors(mapper.toDto(this.getQuestionnaire))
  }

  redirect() {
    this.setState('edit-conveyor')
  }
}
</script>
