//jshint esversion: 6

const app = Vue.createApp({
    data() {
        return {
            data_preset: {
                data1: 10, 
                data2: 20, 
                expect: 15
            },
            data_get:[
                {
                    data1: 1,
                    data2: 2,
                    expect: null,
                }
            ],
            data1: 1,
            data2: 2,
            data3: null,
            data4: 5,
        };
    },
    computed: {
        dataGet() {
            return this.data1 + (this.data2 - this.data1) / 
                (this.data_preset.data2 - this.data_preset.data1) * (this.data_preset.expect - this.data_preset.data1);
        }
    },
});

/* 输入框 */
app.component('input-box',{
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
});

/** 输出框 */
app.component('output-box',{
    props: ['value'],
    template: 
    '<div class="col"><input readonly class="form-control" type="number" :value="value"></div>',
});

/** 输入预期数据栏 */
app.component('preset-row', {
    props: ['datas'],
    template: ('<div class="row my-3"><input-box :modelValue="datas.data1" v-model="datas.data1"></input-box><input-box v-model="datas.expect"></input-box><input-box v-model="datas.data2"></input-box></div>'),
    component: ['input-box'],
});

const vm = app.mount('#app');