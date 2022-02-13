<template>
    <head-row></head-row>
    <preset-row :datas="data_preset"></preset-row>
    <getdata-row
        v-for="item in data_get"
        :key="item.id"
        :data="item"
        @update:data="handleUpdateData"
    ></getdata-row>
    <button @click="addRow" type="button" class="btn btn-primary col-12">点击加一行</button>
</template>

<script>
import HeadRow from './components/HeadRow.vue';
import PresetRow from './components/PresetRow.vue';
import GetDataRow from './components/GetDataRow.vue';

const App = {
    data() {
        return {
            data_preset: {
                data1: 10,
                data2: 20,
                expect: 15
            },
            data_get: [
                {
                    id: 1,
                    data1: 1,
                    data2: 2,
                    expect: null,
                },
            ],
        };
    },
    methods: {
        addRow() {
            let currentRow = this.data_get.length;  // 获取当前行数
            let newRow = {
                id: currentRow + 1,
                data1: null,
                data2: null,
                expect: null,
            };
            this.data_get.push(newRow);
        },
        /** 获取插值 */
        getExpect(item) {
            if (item.data1 !== null && item.data2 !== null) {
                return item.data1 + (item.data2 - item.data1) * (this.data_preset.expect - this.data_preset.data1) / (this.data_preset.data2 - this.data_preset.data1);
            }
            else {
                return '请填写两边的数据';
            }
        },
        /** 处理输入框数据更新 */
        handleUpdateData(data) {
            let id = data.id;   // 获取当前行的 id
            this.data_get[id - 1].data1 = data.data1;  // 更新 data1
            this.data_get[id - 1].data2 = data.data2;  // 更新 data2
            this.data_get[id - 1].expect = this.getExpect(this.data_get[id - 1]);  // 更新 expect
        }
    },
    components: {
        'preset-row': PresetRow,
        'getdata-row': GetDataRow,
        'head-row': HeadRow,
    },
};

export default App;

</script>