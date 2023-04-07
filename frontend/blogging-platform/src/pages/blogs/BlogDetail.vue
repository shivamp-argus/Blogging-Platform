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
        <button class="btn btn-dark card-footer me-3" @click="toggleComments">
          View Comments
        </button>
        <span v-if="isAuthenticated">
          <add-comment
            ><button
              class="btn btn-dark card-footer"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Comment
            </button>
          </add-comment>
          <button
            class="btn btn-dark card-footer ms-3 float-end"
            @click="deleteBlog"
          >
            Delete Blog
          </button>
          <router-link
            class="btn btn-dark card-footer ms-3 float-end"
            :to="updateRoute"
          >
            Update Blog
          </router-link>
        </span>
      </div>

      <ul class="list-group list-group-flush" v-if="hasComments === true">
        <comment-list :id="id"></comment-list>
      </ul>
    </div>
  </div>
</template>
<script>
import AddComment from "../../components/blogs/AddComment.vue";
import CommentList from "../../components/blogs/CommentsList.vue";
export default {
  components: {
    "comment-list": CommentList,
    "add-comment": AddComment,
  },
  props: ["id"],
  data() {
    return {
      error: null,
      hasComments: false,
      viewAddComment: false,
    };
  },
  computed: {
    blog() {
      return this.$store.getters["blogDetail"].blog;
    },
    isAuthenticated() {
      return this.$store.getters["isAuthenticated"];
    },
    updateRoute() {
      return this.$route.path + "/update";
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
    toggleComments() {
      this.hasComments = !this.hasComments;
    },
    async deleteBlog() {
      try {
        await this.$store.dispatch("deleteBlog", {
          blogId: this.id,
          blog: this.blog,
        });
        this.$router.replace("/blogs");
      } catch (err) {
        this.error = err.message || "You are not allowed";
      }
    },
    async updateBlog() {
      try {
        await this.$store.dispatch("updateBlog", this.id);
      } catch (err) {
        this.error = err.message || "You are not allowed to update";
      }
    },
  },
};
</script>
<style></style>
