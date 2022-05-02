<template>
  <div>
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
        <button class="btn btn-danger fullButton" @click="$emit('exportContentOff')">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExportContent",
  props:{
    exportStr: Object,
  },
  emits: ['exportContentOff'],
}
</script>

<style scoped>

</style>