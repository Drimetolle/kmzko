<template>
  <div class="content">
    <v-navigation-drawer
      v-if="false"
      clipped
      right
      floating
      permanent
      app
      overflow
    >
      <Basket class="basket"/>
    </v-navigation-drawer>

    <v-stepper v-model="stateIndex">
      <v-stepper-header>
        <div v-for="(step, i) in flow"
          :key="step"
        >
          <v-stepper-step :complete="flow.indexOf(state) >= i" :step="i+1">{{ $t(step) }}</v-stepper-step>
          <v-divider></v-divider>
        </div>
      </v-stepper-header>
    </v-stepper>
    <v-snackbar
      v-model="snackbar"
      multi-line
      right
    >
      Вы не закончили прошлый проект, желаете продолжить?
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Да
      </v-btn>
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Нет
      </v-btn>
    </v-snackbar>
    <v-container>
      <component :is="state"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapMutations } from 'vuex'
import Basket from '@/components/Basket.vue'
import ListofConveyors from '@/components/ListofConveyors'
import QuestionList from '@/components/QuestionList'
import EditConveyor from '@/components/EditConveyor'
import OptionsConveyor from '@/components/OptionsConveyor'
import { States } from '@/types/states'

@Component({
  methods: {
    ...mapMutations(['setState']),
  },
  computed: {
    ...mapGetters(['getState']),
  },
  components: {
    Basket,
    ListofConveyors,
    QuestionList,
    EditConveyor,
    OptionsConveyor,
  },
})
export default class Configurator extends Vue {
  state = States.QuestionList
  stateIndex = 0
  drawer = null
  flow = [States.QuestionList, States.ListOfConveyors, States.AddOptions]
  snackbar = false

  getState!: States
  setState!: (s: States) => void

  created(): void {
    this.state = this.getState
    this.$store.watch(
      (state, getters) => getters.getState,
      (newValue) => {
        this.state = newValue
      },
    )
  }

  mounted(): void {
    this.snackbar = false
  }
}
</script>

<style scoped>
.basket {
  top: 20px;
}
.content {
  padding: 5px;
}
</style>
