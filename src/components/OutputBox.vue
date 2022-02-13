<template>
    <div class="col">
        <input readonly class="form-control" :value="modelValue" v-bind="$attrs" />
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        modelValue: [Number, String],
    },
};
</script>