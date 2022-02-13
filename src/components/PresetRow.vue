<template>
    <div class="row my-3">
        <input-box :model-value="data.data1" @update:model-value="handleUpdate($event, 'data1')"></input-box>
        <input-box :model-value="data.expect" @update:model-value="handleUpdate($event, 'expect')"></input-box>
        <input-box :model-value="data.data2" @update:model-value="handleUpdate($event, 'data2')"></input-box>
    </div>
</template>

<script>
import InputBox from './InputBox.vue';

/** 输入预期数据栏 */
const PresetRow = {
    props: {
        data: Object,
    },
    components: {
        'input-box': InputBox,
    },
    emits:[
        'update:preset',
    ],
    methods: {
        handleUpdate(value, target) {
            this.$emit('update:preset', value, target);
        },
    }
};

export default PresetRow;
</script>