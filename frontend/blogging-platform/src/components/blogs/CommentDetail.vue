<template>
  <div class="d-flex justify-content-between commentContainer">
    <p>{{ comment.commentText }}</p>

    <span @click="deleteComment" class="me-2"><BIconTrash3Fill /> </span>
  </div>
</template>
<script>
import { BIconTrash3Fill } from 'bootstrap-icons-vue';
export default {
  components: {
    BIconTrash3Fill,
  },
  props: ['comment'],
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async deleteComment() {
      const blogId = this.$route.params.id;
      try {
        await this.$store.dispatch('deleteComment', {
          commentId: this.comment._id,
          blogId,
        });
      } catch (err) {
        this.error = err.message || 'You are not allowed';
      }
    },
  },
};
</script>
<style scoped>
.commentContainer {
  margin-top: 10px;
  margin-bottom: 0px;
}
</style>
