/** 输入预期数据栏 */

import InputBox from './InputBox.js';

const PresetRow = {
    props: {
        datas: Object,
    },
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

export default PresetRow;