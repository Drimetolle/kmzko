<template>
  <div>
    <v-container class="content">
      <component v-if="true" :is="state"/>
    </v-container>
    <Basket class="basket" @submit.prevent="onSubmit"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Basket from '@/components/Basket.vue'
import ListofConveyors from '@/components/ListofConveyors'
import QuestionList from '@/components/QuestionList'

enum States {
  ListOfConveyors = 'listof-conveyors',
  QuestionList = 'question-list',
  ConveyorStatement = '',
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
