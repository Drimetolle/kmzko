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
        :id="detail.id"
        :item="detail"
        :values="values"
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
import { Conveyor, Node, FormConveyor, OptionalDetail } from '@/types/index'
import { mapMutations, mapActions, mapGetters } from 'vuex'

interface Data {
  conveyorСomponents: Array<Node>
  options: Array<OptionalDetail>
  values: Map<string, string>
  loaded: boolean
}

export default Vue.extend({
  data: (): Data => {
    return {
      conveyorСomponents: [],
      values: new Map(),
      options: [],
      loaded: true,
    }
  },
  async created() {
    this.loaded = false
    const a = await this.$store.dispatch('fetchConveyors', new Map())
    this.setConveyor(a[0])
    // const res = this.getConveyor
    const res =  a[0]
    const nodes = res.nodes
    this.conveyorСomponents = nodes
    this.loaded = true
  },
  computed: {
    ...mapGetters(['getConveyor', 'getConveyorById']),
  },
  methods: {
    ...mapActions(['fetchConveyor', 'fetchOptions']),
    ...mapMutations(['setConveyor']),
    setField(id: string, event: string) {
      this.values.set(id, event)
    },
    submit() {
      //
    },
  },
  components: {
    Field,
  },
})
</script>
