<template>
  <div class="container">
    <h2>
      {{ title }}<span>{{ id }}</span>
    </h2>
    <p>{{ body }}</p>
  </div>
</template>
<script>
export default {
  props: ["id", "title", "body"],
};
</script>
<style></style>
