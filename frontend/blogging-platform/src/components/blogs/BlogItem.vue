<template>
  <router-link :to="blogDetailLink" class="text-decoration-none text-dark">
    <div class="card mb-4">
      <div class="card-header">{{ title }}</div>
      <div class="card-body">
        <h5 class="card-title">Lorem, ipsum dolor sit amet</h5>
        <p class="card-text">
          {{ body }}
        </p>
      </div>
    </div>
  </router-link>
</template>
<script>
// import CommentsList from "./CommentsList.vue";
export default {
  components: {
    // "comments-list": CommentsList,
  },
  props: ["id", "title", "body"],
  computed: {
    blogDetailLink() {
      return this.$route.path + "/" + this.id;
    },
  },
  data() {
    return {
      showComments: false,
    };
  },
  methods: {},
};
</script>
<style></style>
