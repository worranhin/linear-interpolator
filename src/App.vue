<template>
    <head-row></head-row>
    <preset-row :data="data_preset" @update:preset="handleUpdatePreset"></preset-row>
    <getdata-row v-for="item in data_get" :key="item.id" :data="item" @update:data="handleUpdateData"
        @deleteRow="handleDeleteRow"></getdata-row>
    <div class="row my-3">
        <div class="col">
            <button @click="addRow" type="button" class="btn btn-primary fullButton">点击加一行</button>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <div class="form-check form-switch">
                <input class="form-check-input" role="switch" type="checkbox" v-model="isAutoAdd" id="autoAdd" />
                <label class="form-check-label" for="autoAdd">自动加行</label>
            </div>
        </div>
        <div class="col-auto">
            <button class="btn btn-secondary" @click="exportData">导出为</button>
        </div>
    </div>
    <!-- 导出内容框 -->
    <div v-if="displayExport">
        <div class="card my-1">
            <div class="card-body">
                <h5 class="card-title">.json</h5>
                <p class="card-text">{{ exportStr.json }}</p>
            </div>
        </div>
        <div class="card my-1">
            <div class="card-body">
                <h5 class="card-title">.csv</h5>
                <pre class="card-text">{{ exportStr.csv }}</pre>
            </div>
        </div>
        <div class="row my-2">
            <div class="col">
                <button class="btn btn-danger fullButton" @click="displayExport = false">关闭</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fullButton {
    width: 100%;
}
</style>

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
            currentId: 1,
            isAutoAdd: true,
            // 导出内容
            exportStr: {
                json: '',
                csv: ''
            },
            displayExport: false,
        };
    },
    methods: {
        /* 添加一行 */
        addRow() {
            let newRow = {
                id: ++this.currentId,
                data1: null,
                data2: null,
                expect: null,
            };

            new Promise((resolve, reject) => {
                try {
                    resolve(this.data_get.push(newRow));  // 新行入栈
                } catch {
                    console.log('添加新行失败', e);
                    reject(e);
                }
            }).then(() => {
                if (!this.displayExport) {   // 若显示了导出框，则不自动滚动
                    window.scrollBy({  // 在添加新行后滚动至底部
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        },

        /** 用数学方法获取插值 */
        getExpect(value1, value2) {
            if (value1 !== null && value2 !== null) {
                return value1 + (value2 - value1) * (this.data_preset.expect - this.data_preset.data1) / (this.data_preset.data2 - this.data_preset.data1);
            }
            else {
                return '请填写两边的数据';
            }
        },

        /** 处理输入框数据更新 */
        handleUpdateData(value, target, id) {
            let targetData = this.data_get.find(item => item.id === id);  // 根据 id 找到对应的数据对象
            // 通过target来判断是哪个 data 被更新
            if (target === 'data1') {
                targetData.data1 = value;
            }
            else if (target === 'data2') {
                targetData.data2 = value;
            }
            else {
                console.error('error: target must be "data1" or "data2"');
            }
            // 更新 expect
            targetData.expect = this.getExpect(targetData.data1, targetData.data2);

            // 自动加行判定
            /******************************* warn **************************************
             * 这里还存在一些问题，如果删除了最后一行的话，再修改最后一行时是不会触发自动加行的
             *  这是因为删除最后一行后的最后一行的 id 将小于 currentId
             * 暂时不知道怎么解决，也许可以在删除最后一行时，将 currentId 减一
             * 但是又觉得没有必要，甚为纠结
             ***************************************************************************/
            if (this.isAutoAdd === true && id === this.currentId && typeof (targetData.expect) === 'number') {
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
            else {
                console.error('error: target must be "data1" or "data2" or "expect"');
            }

            // 更新所有行的 expect
            for (let item of this.data_get) {
                item.expect = this.getExpect(item.data1, item.data2);
            }
        },
        /** 处理删除行 */
        handleDeleteRow(id) {
            let indexToDelete = this.data_get.findIndex(item => item.id === id);
            if (indexToDelete !== -1) {
                this.data_get.splice(indexToDelete, 1);
            }
            else {
                console.warn('warn: delete nothing');
            }
        },
        /** 导出数据 */
        exportData() {
            // 获取数据
            let data = this.data_get.map(item => {
                return {
                    data1: item.data1,
                    data2: item.data2,
                    expect: item.expect,
                };
            });
            data.unshift(this.data_preset);

            // 导出 json
            this.exportStr.json = JSON.stringify(data);

            // 导出 csv
            let csvStr = '';
            for (let item of data) {
                csvStr += `${item.data1},${item.data2},${item.expect}\n`;
            }
            this.exportStr.csv = csvStr;

            // 显示导出框
            new Promise((resolve, reject) => {
                try {
                    resolve(this.displayExport = true);
                } catch (e) {
                    console.log('导出失败', e);
                    reject(e);
                }
            }).then(() => {
                window.scrollBy({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
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