<template>
    <div class="col">
        <input class="form-control" type="number" v-model="value" @focus="focusHandler" v-bind="$attrs" />
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        modelValue: Number,
    },
    emits: ['update:modelValue'],
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    },
    methods: {
        focusHandler(event) {
            event.target.select();  // select all content while focus
        },
    },
}
</script>