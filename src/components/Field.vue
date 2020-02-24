<template>
    <v-text-field
        :label="item.value"
        :placeholder="item.placeholder"
        ></v-text-field>
</template>

<script>
export default {
    props: ['item']
}
</script>
