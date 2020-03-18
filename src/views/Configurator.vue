<template>
  <div>
    <v-container class="content">
      <component v-if="true" :is="state"/>
    </v-container>
    <v-navigation-drawer
      clipped
      right
      floating
      permanent
      app
      overflow>
      <Basket class="basket"/>
    </v-navigation-drawer>
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
  drawer: null
}

export default Vue.extend({
  data: () => {
    return {
      state: '',
      drawer: null,
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
  top: 20px;
}
</style>
