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
        :item="toFieldSkelet(option)"
        :converter="getConverter"
        :values="values"
        />
      </div>
    </v-container>
    <v-btn class="mr-4" @click.prevent="submit">tes</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { OptionalDetail } from '@/types/index'
import Field from '@/components/Field.vue'
import OptionConverter from '@/utils/optionConverter'
import { saveConveyor } from '@/utils/request/index'

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
    ...mapGetters(['getConveyorType', 'getUserConveyor']),
    getConverter(): OptionConverter {
      return new OptionConverter()
    },
  },
  methods: {
    ...mapActions(['fetchOptions']),
    ...mapMutations(['setListOfOptions']),
    submit() {
      this.setListOfOptions(this.options)
      console.log(this.getUserConveyor)
      // saveConveyor()
    },
    toFieldSkelet(option: any) {
      return OptionConverter.prototype.toFieldSkelet(option)
    },
  },
  components: {
    Field,
  },
})
</script>
