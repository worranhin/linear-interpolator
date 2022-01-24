<template>
    <div class="col">
        <input readonly class="form-control" type="number" :value="value" />
    </div>
</template>

<script>
export default {
    props: {
        value: Number,
    },
};
</script>