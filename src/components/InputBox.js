export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    template: 
    ('<div class="col"><input class="form-control" type="number" v-model="value" @focus="focusHandler"></div>'),
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