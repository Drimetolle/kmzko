<template>
  <div>
    <v-row v-if="conveyors.length" dense>
      <v-expansion-panels>
        <v-col cols="12" v-for="elem in conveyors"
          :key="elem.id"
          :id="elem.id">
          <!-- <ConveyorCard @select="next" -->
          <ConveyorCard 
            :conveyor="elem"/>
        </v-col>
      </v-expansion-panels>
    </v-row>
    <p v-else-if="!conveyors.length">Подходящие конвейеры не найдены</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ConveyorLight } from '@/types/index'
import ConveyorCard from '@/components/ConveyorCard'
import { mapMutations, mapActions, mapGetters } from 'vuex'

interface Data {
  conveyors: Array<ConveyorLight>
}

export default Vue.extend({
  data: (): Data => {
    return {
      conveyors: [],
    }
  },
  async mounted() {
    this.conveyors = await this.fetchConveyors(this.getQuestionnaire)
    console.log(this.conveyors)
  },
  computed: {
    ...mapGetters(['getConveyors', 'getQuestionnaire']),
  },
  methods: {
    ...mapActions(['fetchConveyors']),
    next() {
      this.$store.commit('setState', 'edit-conveyor')
    },
  },
  components: {
    ConveyorCard,
  },
})
</script>