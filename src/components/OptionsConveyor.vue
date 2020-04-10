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
          :item="toFieldSkelet(option)"
        />
      </div>
    </v-container>
    <v-btn v-if="loaded" class="mr-4" @click.prevent="submit">tes</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { OptionalDetail } from '@/types/index'
import Field from '@/components/Field.vue'
import OptionConverter from '@/utils/optionConverter'
import { saveConveyor } from '@/utils/request/index'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'
import Component, { mixins } from 'vue-class-component'

@Component({
  components: {
    Field,
  },
  methods: {
    ...mapActions(['fetchOptions']),
    ...mapMutations(['setListOfOptions']),
  },
  computed: {
    ...mapGetters(['getConveyorType', 'getUserConveyor']),
  },
})
export default class extends mixins(LoadingMixin){
  options: Array<OptionalDetail> = []

  fetchOptions!: (type: string) => Promise<Array<OptionalDetail>>
  setListOfOptions!: (...args: any) => void
  getConveyorType!: string
  getUserConveyor!: any

  @AsyncLoading
  async mounted() {
    this.options = await this.fetchOptions('tape')
  }

  submit() {
    this.setListOfOptions(this.options)
    saveConveyor(this.getUserConveyor)
  }

  toFieldSkelet(option: any) {
    return OptionConverter.prototype.toFieldSkelet(option)
  }
}
</script>
