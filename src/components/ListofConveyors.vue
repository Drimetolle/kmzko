<template>
  <div>
    <v-row v-if="conveyors.length" dense>
      <v-col cols="12" v-for="elem in conveyors"
        :key="elem.id"
        :id="elem.id">
        <ConveyorCard @select="next"
          :conveyor="elem"/>
      </v-col>
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
    await this.fetchConveyors(new Map<string, string>())
    const res = this.getConveyors
    this.conveyors = res
  },
  computed: {
    ...mapGetters(['getConveyors']),
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