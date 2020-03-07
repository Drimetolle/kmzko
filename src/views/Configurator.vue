<template>
  <div>
    <v-container class="content">
      <component v-if="true" :is="state"/>
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
