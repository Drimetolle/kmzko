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
import { mapGetters } from 'vuex'
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
  data: () => {
    return {
      state: '',
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
