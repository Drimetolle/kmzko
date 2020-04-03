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
        <Field v-for="option in options"
        :key="option.id"
        :id="option.id"
        :item="option"
        :values="values"
        />
      </div>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { OptionalDetail } from '@/types/index'
import Field from '@/components/Field.vue'

interface Data {
  loaded: boolean
  options: Array<OptionalDetail>
  values: Map<string, string>
}

export default Vue.extend({
  data: (): Data => {
    return {
      options: [],
      values: new Map(),
      loaded: true,
    }
  },
  async created() {
    this.loaded = false
    this.options = await this.fetchOptions('tape')

    this.loaded = true
  },
  computed: {
    ...mapGetters(['getConveyorType']),
  },
  methods: {
    ...mapActions(['fetchOptions']),
    ...mapMutations(['setListOfOptions']),
    submit() {
      // console.log(this.values)
    },
  },
  components: {
    Field,
  },
})
</script>
