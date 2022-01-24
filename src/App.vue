<template>
    <head-row></head-row>
    <preset-row :datas="data_preset"></preset-row>
    <getdata-row v-for="item in data_get" :key="item.id" :datas="item" :ratio="expectRatio"></getdata-row>
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
            catch (err) {
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
        'getdata-row': GetDataRow,
        'head-row': HeadRow,
    },
};

export default App;

</script>