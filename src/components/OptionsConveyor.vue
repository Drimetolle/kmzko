<template>
  <v-form>
    <h2 v-if="loaded">{{ $t('options') }}</h2>
    <v-container>
      <div class="text-center">
        <v-progress-circular
          v-if="!loaded"
          indeterminate
          color="primary"
          size="50"
        ></v-progress-circular>

      </div>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { OptionalDetail } from '@/types/index'

interface Data {
  loaded: boolean
  options: Array<OptionalDetail>
}

export default Vue.extend({
  data: (): Data => {
    return {
      options: [],
      loaded: true,
    }
  },
  async created() {
    this.loaded = false
    // this.options = await this.fetchOptions(this.getConveyorType)

    this.loaded = true
  },
  computed: {
    ...mapGetters(['getConveyorType']),
  },
  methods: {
    ...mapActions(['fetchOptions']),
    ...mapMutations(['setListOfOptions']),
  },
})
</script>
