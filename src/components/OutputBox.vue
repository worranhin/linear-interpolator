<template>
    <div class="col">
        <input readonly class="form-control" :value="value" />
    </div>
</template>

<script>
export default {
    props: {
        value: [Number, String],
    },
};
</script>