<template>
  <v-form v-model="valid">
    <v-container>
      <v-row
          align="center"
          justify="start"
      >
        <v-col
            cols="10"
            md="24"
        >
          <v-select
            :items="items"
            v-model="select"
            label="select"
            @change="getForm"
          >
          </v-select>
          <div class="text-center">
            <v-progress-circular
              v-if="!loaded"
              indeterminate
              color="primary"
              size="50"
            ></v-progress-circular>
          </div>
          <Field v-for="component in conveyorСomponents"
            :key="component.mark"
            :id="component.mark"
            :item="toFieldSkelet(component)"
            :converter="getConverter"
            :values="values"/>
          <v-btn v-if="select !== '' && loaded" class="mr-4" @click.prevent="submit">{{ $t('submit') }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Field from '@/components/Field.vue'
import { FormConveyor, States, SelectElement, ImplSelectElement } from '@/types/index'
import { getConveyorTypes } from '@/utils/request/index'
import OptionConverter from '@/utils/optionConverter'
import LoadingMixin from '@/mixin/loading.mixin'
import loadingMixin from '@/mixin/loading.mixin'

interface Data {
  conveyorСomponents: Array<FormConveyor>
  items: Array<SelectElement>
  select: string,
  values: Map<string, string>
  loaded: boolean
  valid: boolean
}

export default Vue.extend({
  mixins: [LoadingMixin],
  data: (): Data => {
    return {
      conveyorСomponents: [],
      items: [],
      select: '',
      values: new Map(),
      loaded: true,
      valid: false,
    }
  },
  async created() {
    const conveyorTypes: Array<string> = await getConveyorTypes()
    const localeItems = conveyorTypes.map(i => this.$t(i)) as Array<string>
    this.items = conveyorTypes.map(i => new ImplSelectElement(this.$t(i), i))
  },
  methods: {
    ...mapMutations(['setState', 'setQuestionnaire']),
    ...mapActions(['getFormConveyor', 'fetchConveyors']),
    async getForm() {
      this.loaded = false
      const newConveyorСomponents = await this.getFormConveyor({ type: this.select })
      this.conveyorСomponents = newConveyorСomponents
      this.loaded = true
    },
    submit() {
      this.setQuestionnaire(this.values)
      this.setState(States.ListOfConveyors)
    },
    toFieldSkelet(option: any) {
      return OptionConverter.prototype.toFieldSkelet(option)
    },
  },
  computed: {
    getConverter(): OptionConverter {
      return new OptionConverter()
    },
  },
  components: {
    Field,
  },
})
</script>
