<template>
    <div class="row my-3">
        <input-box
            :model-value="data.data1"
            @update:model-value="handleUpdate($event, 'data1')"
            placeholder="请输入第一个数据"
        ></input-box>
        <input-box 
            :model-value="data.data2" 
            @update:model-value="handleUpdate($event, 'data2')"
            placeholder="请输入第二个数据"
        ></input-box>
        <output-box :model-value="data.expect"></output-box>
        <div class="col-2">
            <button @click="$emit('deleteRow', data.id)">删除</button>
        </div>
    </div>
</template>

<script>
import InputBox from './InputBox.vue';
import OutputBox from './OutputBox.vue';

/** 期望输出栏 */
const GetDataRow = {
    props: {
        data: Object,
    },
    emits: ['update:data', 'deleteRow'],
    components: {
        'input-box': InputBox,
        'output-box': OutputBox,
    },
    methods: {
        /** 处理输入框更新 */
        handleUpdate(value, target) {
            this.$emit('update:data', value, target, this.data.id);
        },
    },
};

export default GetDataRow;
</script>