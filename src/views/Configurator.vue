<template>
    <div>
        <v-container class="content">
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
import { AUTH_REQUEST } from 'actions/auth'
export default {
    data: () => {
        return {
            /**
             * Example component: {type: 'engine', price: 10000}
             */
            conveyorСomponents: [
                { type: 'engine', id: '1' },
                { type: 'engine', id: '2' },
                { type: 'engine', id: '3' },
                { type: 'engine', id: '4' },
                { type: 'engine', id: '5' },
                { type: 'engine', id: '6' },
                { type: 'engine', id: '7' },
                { type: 'engine', id: '8' },
                { type: 'engine', id: '9' },
                { type: 'engine', id: '10' },
                { type: 'engine', id: '11' },
                { type: 'engine', id: '12' },
                { type: 'engine', id: '13' },
                { type: 'engine', id: '14' },
                { type: 'engine', id: '15' },
                { type: 'engine', id: '16' }]
            // conveyorСomponents: [
            //     { type: 'engine', name: 'v8', price: 666 },
            //     { type: 'engine', name: 'v7', price: 666 }]
            // conveyorСomponents: [
            //     { key: '', type: 'engine', price: 10000 },
            //     { key: '', type: 'engine', price: 465 },
            //     { key: '', type: 'engine', price: 87128 },
            //     { key: '', type: 'engine', price: 5200 },
            //     { key: '', type: 'engine', price: 4613 }
            // ]
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
            this.$store.dispatch(AUTH_REQUEST, {
                username: 'dogo',
                password: 'dogy'
            })
        },
        addСomponent (elem) {
            this.conveyorСomponents.push(elem)
        },
        removeСomponent (elem) {
            this.conveyorСomponents.pop(elem)
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
