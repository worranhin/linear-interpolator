import InputBox from './InputBox.js';
import OutputBox from './OutputBox.js';

/** 期望输出栏 */
const GetdataRow = {
    props: {
        datas: Object,
        ratio: Number
    },
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

export default GetdataRow;