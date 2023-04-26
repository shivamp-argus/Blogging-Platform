<template>
  <comment-detail
    class="list-group-item"
    v-for="comment of commentsList"
    :key="comment._id"
    :comment="comment"
  >
  </comment-detail>
</template>
<script>
import CommentDetail from './CommentDetail.vue';
export default {
  components: {
    'comment-detail': CommentDetail,
  },
  props: ['id'],
  created() {
    this.loadComments();
  },
  computed: {
    commentsList() {
      return this.$store.getters['comments'];
    },
  },
  updated() {
    this.loadComments();
  },
  methods: {
    async loadComments() {
      const blogId = this.$route.params.id;
      this.$store.dispatch('loadComments', blogId);
    },
  },
};
</script>
<style scoped>
.list-group-item {
  height: 40px;
}
</style>
