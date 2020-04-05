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
import { Conveyor } from '@/types/index'
import ConveyorCard from '@/components/ConveyorCard'
import { mapMutations, mapActions, mapGetters } from 'vuex'

interface Data {
  conveyors: Array<Conveyor>
  loaded: boolean
}

export default Vue.extend({
  data: (): Data => {
    return {
      conveyors: [],
      loaded: true,
    }
  },
  async mounted() {
    this.loaded = false
    this.conveyors = await this.fetchConveyors(this.getQuestionnaire)
    this.loaded = true
  },
  computed: {
    ...mapGetters(['getConveyors', 'getQuestionnaire']),
  },
  methods: {
    ...mapActions(['fetchConveyors']),
    ...mapMutations(['setState']),
    redirect() {
      this.setState('edit-conveyor')
    },
  },
  components: {
    ConveyorCard,
  },
})
</script>
