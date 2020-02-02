<template>
    <div>
        <h3>Some text</h3>
        <h4>{{price}}</h4>
        <input type="submit" value="Сделать заказ">
    </div>
</template>

<script>
export default {
    name: 'basket',
    props: {
        price: Number
    }
}
</script>
