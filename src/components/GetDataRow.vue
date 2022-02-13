<template>
    <div class="row my-3">
        <input-box
            :model-value="data.data1"
            @update:model-value="handleUpdate($event, 'data1')"
            placeholder="请输入第一个数据"
        ></input-box>
        <output-box :value="data.expect"></output-box>
        <input-box 
            :model-value="data.data2" 
            @update:model-value="handleUpdate($event, 'data2')"
            placeholder="请输入第二个数据"
        ></input-box>
    </div>
</template>

<script>
import InputBox from './InputBox.vue';
import OutputBox from './OutputBox.vue';

/** 期望输出栏 */
const GetDataRow = {
    props: {
        data: Object,
        expectData: [Number, String],
        id: Number,
    },
    emits: ['getExpect', 'update:data', 'update:data2'],
    components: {
        'input-box': InputBox,
        'output-box': OutputBox,
    },
    methods: {
        /** 处理输入框更新 */
        handleUpdate(value, target) {
            let emitData = {
                id: this.data.id,
                data1: this.data.data1,
                data2: this.data.data2,
            };
            // 通过target来判断是哪个data被更新
            if (target === 'data1') {
                emitData.data1 = value;
            }
            else if (target === 'data2') {
                emitData.data2 = value;
            }
            this.$emit('update:data', emitData);
        },
    },
};

export default GetDataRow;
</script>