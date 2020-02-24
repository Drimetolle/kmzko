<template>
    <v-text-field
        :label="item.type"
        placeholder="Placeholder"
        ></v-text-field>
</template>

<script>
export default {
    props: ['item']
}
</script>
