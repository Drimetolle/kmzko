<template>
  <div>
    <v-container class="content">
      <component v-if="true" :is="state" :conveyors="test"/>
    </v-container>
    <Basket class="basket" @submit.prevent="onSubmit"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Conveyor } from '@/types/index'
import Basket from '@/components/Basket.vue'
import ListofConveyors from '@/components/ListofConveyors'
import QuestionList from '@/components/QuestionList'

enum States {
  ListOfConveyors = 'listof-conveyors',
  QuestionList = 'question-list',
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
    test(): Array<Conveyor> {
      return [
        {id: 1, name: 'conveyor1', components: ['engine', 'tape']},
        {id: 2, name: 'conveyor2', components: ['engine', 'tape']},
      ]
    },
  },
  methods: {
    onSubmit() {
      this.state = States.ListOfConveyors
    },
  },
  components: {
    Basket,
    ListofConveyors,
    QuestionList,
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
