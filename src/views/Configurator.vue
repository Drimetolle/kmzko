<template>
  <div>
    <v-container class="content">
      <component v-if="true" :is="name" :conveyors="test"/>
    </v-container>
    <form @submit.prevent="onSubmit">
      <v-container>
        <Basket class="basket" v-bind:price="getPrice"/>
      </v-container>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Basket from '@/components/Basket.vue'
import ListofConveyors from '@/components/ListofConveyors'
import QuestionList from '@/components/QuestionList'

export default Vue.extend({
  data: () => {
    return {
    }
  },
  computed: {
    getPrice(): number {
      return 0; // this.conveyorСomponents.reduce((a, { price }) => a + price, 0);
    },
    name() {
      // return 'listof-conveyors'
      return 'question-list'
    },
    test() {
      return [
        {id: 1},
        {id: 2},
      ]
    },
  },
  methods: {
    onSubmit() {
      return;
    },
    // addСomponent (elem) {
    //   this.conveyorСomponents.push(elem)
    // },
    // removeСomponent (elem) {
    //   this.conveyorСomponents.pop(elem)
    // },
    // async getForm() {
    //   const newConveyorСomponents = await this.$store.dispatch(GET_FORM_CONVEYOR, { type: this.select });
    //   this.conveyorСomponents = newConveyorСomponents;
    // },
  },
  components: {
    Basket,
    ListofConveyors,
    QuestionList,
  },
});
</script>

<style scoped>
.basket {
  right: 40px;
  top: 100px;
  position: fixed;
}
.content {
  width: 75%;
  margin-left: 50px;
}
</style>
