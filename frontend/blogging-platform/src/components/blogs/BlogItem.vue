<template>
  <router-link :to="blogDetailLink" class="text-decoration-none text-dark">
    <div class="card mt-4">
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
      console.log(...this.$store.getters["blogs"]);
      return this.$route.path + "/" + this.id;
    },
    blogTitle() {
      return this.title;
    },
    blogBody() {
      return this.body;
    },
  },
  data() {
    return {
      showComments: false,

      comments: [
        {
          id: 1,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsam?",
        },
        {
          id: 2,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsam?",
        },
        {
          id: 3,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, ipsam?",
        },
      ],
    };
  },
};
</script>
<style></style>
