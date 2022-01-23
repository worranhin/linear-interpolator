// import './style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import HeadRow from './components/HeadRow.js';
import PresetRow from './components/PresetRow.js';
import GetdataRow from './components/GetdataRow.js';

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
    },
});

const vm = app.mount('#app');