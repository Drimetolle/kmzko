<template>
  <div>
    <v-navigation-drawer
      clipped
      right
      floating
      permanent
      app
      overflow>
      <Basket class="basket"/>
    </v-navigation-drawer>

    <v-stepper v-model="stateIndex">
      <v-stepper-header>
        <div v-for="(step, i) in flow"
          :key="step">
          <v-stepper-step :complete="flow.indexOf(state) >= i" :step="i+1">{{step}}</v-stepper-step>
          
          <v-divider></v-divider>
        </div>
      </v-stepper-header>
    </v-stepper>

    <v-container class="content">
      <component v-if="true" :is="state"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import Basket from '@/components/Basket.vue'
import ListofConveyors from '@/components/ListofConveyors'
import QuestionList from '@/components/QuestionList'
import EditConveyor from '@/components/EditConveyor'
import { States } from '@/types/states'

interface Data {
  state: States
  drawer: null
}

export default Vue.extend({
  data: () => {
    return {
      state: '',
      stateIndex: 0,
      drawer: null,
      flow: [States.QuestionList, States.ListOfConveyors, States.EditConveyor],
    }
  },
  computed: {
  },
  created() {
    this.state = this.getState()
    this.$store.watch(
      (state, getters) => getters.getState,
      (newValue, oldValue) => {
        this.state = newValue

      },
    )
  },
  methods: {
    ...mapGetters(['getState']),
     ...mapMutations(['setState']),
  },
  components: {
    Basket,
    ListofConveyors,
    QuestionList,
    EditConveyor,
  },
})
</script>

<style scoped>
.basket {
  top: 20px;
}
</style>
