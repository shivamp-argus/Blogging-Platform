<template>
  <div class="d-flex justify-content-between">
    <p>{{ comment.commentText }}</p>
    <button class="btn btn-dark" @click="deleteComment">Delete Comment</button>
  </div>
</template>
<script>
export default {
  props: ["comment"],
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async deleteComment() {
      const blogId = this.$route.params.id;
      try {
        await this.$store.dispatch("deleteComment", {
          commentId: this.comment._id,
          blogId,
        });
      } catch (err) {
        this.error = err.message || "You are not allowed";
      }
    },
  },
};
</script>
