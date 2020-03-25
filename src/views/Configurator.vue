<template>
  <div class="content">
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
      // flow: [States.QuestionList, States.ListOfConveyors, States.EditConveyor, States.AddOptions],
      flow: [States.QuestionList, States.ListOfConveyors],
      snackbar: false,
    }
  },
  computed: {
  },
  methods: {
    ...mapGetters(['getState']),
     ...mapMutations(['setState']),
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
  mounted() {
    this.snackbar = false
    // check previous project
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
.content {
  padding: 5px;
}
</style>
