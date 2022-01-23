// import './style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/* 输入框 */
// import InputBox from './components/InputBox';
// import OutputBox from './components/OutputBox';
// import HeadRow from './components/HeadRow';

const HeadRow = {
    template: '\
    <h1>线性插值器</h1>\
    <div class="row my-3">\
        <div class="col">已知数据1</div>\
        <div class="col">待求数据</div>\
        <div class="col">已知数据2</div>\
    </div>'
};

const InputBox = {
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
};

const OutputBox = {
    props: ['value'],
    template: 
    '<div class="col"><input readonly class="form-control" type="number" :value="value"></div>',
};

/** 输入预期数据栏 */
const PresetRow = {
    props: ['datas'],
    template: '\
        <div class="row my-3">\
            <input-box v-model="datas.data1"></input-box>\
            <input-box v-model="datas.expect"></input-box>\
            <input-box v-model="datas.data2"></input-box>\
        </div>',
    components: {
        'input-box': InputBox,
    },
};

/** 期望输出栏 */
const GetdataRow = {
    props: ['datas', 'ratio'],
    template: '\
        <div class="row my-3">\
            <input-box v-model="datas.data1"></input-box>\
            <output-box :value="data_expect"></output-box>\
            <input-box v-model="datas.data2"></input-box>\
        </div>',
    computed: {
        data_expect() {
            return this.datas.data1 + (this.datas.data2 - this.datas.data1) * this.ratio;
        }
    },
    components: {
        'input-box': InputBox,
        'output-box': OutputBox,
    }
};


// const Vue = require('vue');
const app = Vue.createApp({
    data() {
        return {
            data_preset: {
                data1: 10, 
                data2: 20, 
                expect: 15
            },
            data_get: [
                {
                    data1: 1,
                    data2: 2,
                    id: 1,
                },
            ],
        };
    },
    computed: {
        expectRatio() {
            try {
                return (this.data_preset.expect - this.data_preset.data1) / (this.data_preset.data2 - this.data_preset.data1);
            }
            catch(err){
                console.log(err);
            }
        }
    },
    methods: {
        addRow() {
            let currentRow = this.data_get.length;  // 获取当前行数
            let newRow = {
                data1: null,
                data2: null,
                id: currentRow + 1,
            };
            this.data_get.push(newRow);
        }
    },
    components: {
        'preset-row': PresetRow,
        'getdata-row': GetdataRow,
        'head-row': HeadRow,
    }
});

const vm = app.mount('#app');