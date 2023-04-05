<template>
  <div class="container">
    <div class="card">
      <h2 class="card-header">
        {{ blog.title }}
      </h2>
      <div class="card-body">
        <h3>
          <span>This is id:{{ id }}</span>
        </h3>
        <p>{{ blog.body }}</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-dark card-footer" @click="toggleComments">
          View Comments
        </button>
        <button class="btn btn-dark card-footer" @click="addComments">
          Add Comment
        </button>
      </div>

      <ul class="list-group list-group-flush" v-if="hasComments === true">
        <!-- <li
          class="list-group-item"
          v-for="comment of comments"
          :key="comment._id"
        >
          {{ comment.commentText }}
        </li> -->
        <comment-list :id="id"></comment-list>
      </ul>
    </div>
  </div>
</template>
<script>
import CommentList from "../../components/blogs/CommentsList.vue";
export default {
  components: {
    "comment-list": CommentList,
  },
  props: ["id"],
  data() {
    return {
      error: null,
      hasComments: false,
    };
  },
  computed: {
    blog() {
      return this.$store.getters["blogDetail"].blog;
    },
    // comments() {
    //   return this.$store.getters["blogDetail"].comments;
    // },
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
    toggleComments() {
      this.hasComments = !this.hasComments;
    },
    async addComments() {
      try {
        await this.$store.dispatch("addComment");
      } catch (err) {
        this.error = err.message || "Comments cannot be added yet";
      }
    },
  },
};
</script>
<style></style>
