<template>
    <div>
        <v-container class="content">
             <v-select
                :items="items"
                v-model="select"
                label="select"
                @change="getForm"
                ></v-select>
            <Field v-for="component in conveyorСomponents"
                :key="component.id"
                :id="component.id"
                :item="component"/>
        </v-container>
        <form @submit.prevent="onSubmit">
            <v-container>
                <Basket class="basket" v-bind:price="getPrice"/>
            </v-container>
        </form>
    </div>
</template>

<script>
import Basket from '@/components/Basket.vue'
import Field from '@/components/Field.vue'
import { GET_FORM_CONVEYOR } from 'actions/configurator'
export default {
    data: () => {
        return {
            conveyorСomponents: [],
            items: ['Ленточный', 'Скребковый'],
            select: ''
        }
    },
    computed: {
        getPrice () {
            return this.conveyorСomponents.reduce((a, { price }) => a + price, 0) | 0
        }
    },
    methods: {
        onSubmit () {
            console.log('Submit!')
        },
        addСomponent (elem) {
            this.conveyorСomponents.push(elem)
        },
        removeСomponent (elem) {
            this.conveyorСomponents.pop(elem)
        },
        async getForm () {
            const newConveyorСomponents = await this.$store.dispatch(GET_FORM_CONVEYOR, { type: this.select })
            this.conveyorСomponents = newConveyorСomponents
        }
    },
    components: {
        Basket,
        Field
    }
}
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
