<template>
  <div class="container">
    <h2>
      {{}}<span>{{ id }}</span>
    </h2>
    <p>{{ blogBody }}</p>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      error: null,
    };
  },
  computed: {
    blogBody() {
      return this.$store.getters["blogDetail"].body;
    },
  },
  created() {
    this.blogDetail();
  },
  methods: {
    async blogDetail() {
      try {
        await this.$store.dispatch("loadBlog", this.id);
      } catch (err) {
        this.error = err.message || "Blog cannot be loaded at this moment";
      }
    },
  },
};
</script>
<style></style>
