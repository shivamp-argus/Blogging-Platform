<template>
  <div class="card mt-1" style="width: 30rem">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ text }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["text"],
};
</script>
<style></style>
