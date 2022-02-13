<template>
    <head-row></head-row>
    <preset-row :data="data_preset" @update:preset="handleUpdatePreset"></preset-row>
    <getdata-row
        v-for="item in data_get"
        :key="item.id"
        :data="item"
        @update:data="handleUpdateData"
    ></getdata-row>
    <button @click="addRow" type="button" class="btn btn-primary col-12">点击加一行</button>
    <div class="form-check form-switch mt-3">
        <input class="form-check-input" role="switch" type="checkbox" v-model="isAutoAdd" id="autoAdd">
        <label class="form-check-label" for="autoAdd">自动加行</label>
    </div>
</template>

<script>
import HeadRow from './components/HeadRow.vue';
import PresetRow from './components/PresetRow.vue';
import GetDataRow from './components/GetDataRow.vue';

const App = {
    data() {
        return {
            data_preset: {
                data1: 1,
                data2: 3,
                expect: 2
            },
            data_get: [
                {
                    id: 1,
                    data1: 10,
                    data2: 30,
                    expect: 20,
                },
            ],
            isAutoAdd: true,
        };
    },
    methods: {
        /* 添加一行 */
        addRow() {
            let currentRow = this.data_get.length;  // 获取当前行数
            let newRow = {
                id: currentRow + 1,
                data1: null,
                data2: null,
                expect: null,
            };
            this.data_get.push(newRow);  // 新行入栈
        },
        /** 用数学方法获取插值 */
        getExpect(item) {
            if (item.data1 !== null && item.data2 !== null) {
                return item.data1 + (item.data2 - item.data1) * (this.data_preset.expect - this.data_preset.data1) / (this.data_preset.data2 - this.data_preset.data1);
            }
            else {
                return '请填写两边的数据';
            }
        },
        /** 处理输入框数据更新 */
        handleUpdateData(value, target, id) {
            // 通过target来判断是哪个 data 被更新
            if (target === 'data1') {
                this.data_get[id - 1].data1 = value;
            }
            else if (target === 'data2') {
                this.data_get[id - 1].data2 = value;
            }
            // 更新 expect
            this.data_get[id - 1].expect = this.getExpect(this.data_get[id - 1]);

            // 自动加行判定
            if (this.isAutoAdd === true && id === this.data_get.length && typeof(this.data_get[id - 1].expect) === 'number') {
                this.addRow();
            }
        },
        /** 处理预设数据更新 */
        handleUpdatePreset(value, target) {
            // 根据 target 更新相应的数据
            if (target === 'data1') {
                this.data_preset.data1 = value;
            }
            else if (target === 'data2') {
                this.data_preset.data2 = value;
            }
            else if (target === 'expect') {
                this.data_preset.expect = value;
            }

            // 更新所有行的 expect
            for (let item of this.data_get) {
                item.expect = this.getExpect(item);
            }
        },
    },
    components: {
        'preset-row': PresetRow,
        'getdata-row': GetDataRow,
        'head-row': HeadRow,
    },
};

export default App;

</script>