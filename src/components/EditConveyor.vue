<template>
  <v-form>
    <div class="text-center">
      <v-progress-circular
        v-if="!loaded"
        indeterminate
        color="primary"
        size="50"
      ></v-progress-circular>
    </div>
    <v-container v-for="component in conveyorСomponents"
      :key="component.id"
    >
      <h2>{{ component.name }}</h2>
      <Field v-for="detail in component.details"
        :key="detail.id"
        :item="toFieldSkelet(detail)"
      />
    </v-container>
    <v-container>
      <h2>{{ $t('options') }}</h2>
    </v-container>
    <v-btn v-if="loaded" class="mr-4" @click.prevent="submit">save</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import Field from '@/components/Field.vue'
import { Conveyor, Node, OptionalDetail } from '@/types/index'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import OptionConverter from '@/utils/optionConverter'
import Component, { mixins } from 'vue-class-component'
import LoadingMixin, { AsyncLoading } from '@/mixin/loading.mixin'

@Component({
  components: {
    Field,
  },
  methods: {
    ...mapActions(['fetchConveyor', 'fetchOptions']),
    ...mapMutations(['setConveyor']),
  },
  computed: {
    ...mapGetters(['getConveyor', 'getConveyorById']),
  },
})
export default class EditConveyor extends mixins(LoadingMixin){
  conveyorСomponents: Array<Node> = []
  options: Array<OptionalDetail> = []

  fetchConveyor!: Promise<Conveyor>
  fetchOptions!: Promise<Array<OptionalDetail>>
  setConveyor!: (...args: any) => void
  getConveyor!: Conveyor
  getConveyorById!: (id: string) => Conveyor

  @AsyncLoading
  async mounted() {
    const a = await this.$store.dispatch('fetchConveyors', new Map())
    this.setConveyor(a[0])
    // const res = this.getConveyor
    const res =  a[0]
    const nodes = res.nodes
    this.conveyorСomponents = nodes
  }

  submit() {
    //
  }
  toFieldSkelet(option: any) {
    return OptionConverter.prototype.toFieldSkelet(option)
  }
}
</script>
