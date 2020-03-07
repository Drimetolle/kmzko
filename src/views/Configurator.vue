<template>
  <div>
    <v-container class="content">
      <component v-if="true" :is="state" @changeState="changeState1"/>
    </v-container>
    <Basket class="basket"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Basket from '@/components/Basket.vue'
import ListofConveyors from '@/components/ListofConveyors'
import QuestionList from '@/components/QuestionList'
import EditConveyor from '@/components/EditConveyor'

enum States {
  ListOfConveyors = 'listof-conveyors',
  QuestionList = 'question-list',
  EditConveyor = 'edit-conveyor',
}

interface Data {
  state: States
}

export default Vue.extend({
  data: (): Data => {
    return {
      state: States.QuestionList,
    }
  },
  computed: {
  },
  mounted() {
    this.state = this.$store.getters.getState
    // this.$store.watch('setState', () => {console.log('setState')})
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.getState,
      (newValue, oldValue) => {
        this.state = newValue
      },
    )
  },
  methods: {
    onSubmit() {
      this.state = States.ListOfConveyors
    },
    onSubmit1() {
      this.state = States.EditConveyor
    },
    changeState1({type}: {type: States}) {
      // debugger
      this.state = type
    },
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
  right: 40px;
  top: 80px;
  position: fixed;
}
.content {
  width: 75%;
  margin-left: 50px;
}
</style>
