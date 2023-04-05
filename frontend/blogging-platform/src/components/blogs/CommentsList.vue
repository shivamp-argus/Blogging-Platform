<template>
  <li
    class="list-group-item"
    v-for="comment of commentsList"
    :key="comment._id"
  >
    {{ comment.commentText }}
  </li>
</template>
<script>
export default {
  props: ["id"],
  created() {
    this.loadComments();
  },
  computed: {
    commentsList() {
      return this.$store.getters["comments"];
    },
  },
  updated() {
    this.loadComments();
  },
  methods: {
    async loadComments() {
      const blogId = this.$route.params.id;
      this.$store.dispatch("loadComments", blogId);
    },
  },
};
</script>
<style></style>
