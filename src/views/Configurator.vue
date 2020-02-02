<template>
    <form @submit.prevent="onSubmit">
        <Field v-for="component in conveyorСomponents"
            :key="component.id"
            :item="component"/>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <div class="container">
            <Basket v-bind:price="getPrice"/>
        </div>
    </form>
</template>

<script>
import Basket from '@/components/Basket.vue'
import Field from '@/components/Field.vue'
import apiCall from '@/utils/json-server'
import { AUTH_REQUEST } from 'actions/auth'
export default {
    data: () => {
        return {
            /**
             * Example component: {type: 'engine', price: 10000}
             */
            conveyorСomponents: apiCall.getComplect()
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

<style>
.container {
    border: 1px solid black;
    width: 130px;
    height: 200px;
    position: fixed;
    top: 100px;
    right: 40px;
}
</style>
