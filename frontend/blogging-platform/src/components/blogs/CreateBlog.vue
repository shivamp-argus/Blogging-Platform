<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Blog Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Enter the title of blog"
          v-model.trim="title"
        />
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">Blog Body</label>
        <textarea
          class="form-control"
          id="body"
          rows="3"
          placeholder="Start writing your blog from here..."
          v-model.trim="body"
        ></textarea>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary" v-if="!updatePath">
          Create Blog
        </button>
        <button type="submit" class="btn btn-primary" v-else>
          Update Blog
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  // props: ["blog"],
  data() {
    return {
      title: "",
      body: "",
      formIsValid: true,
      error: null,
    };
  },
  computed: {
    updatePath() {
      return this.$route.path.includes("update");
    },
  },
  created() {
    if (this.$route.path.includes("update")) {
      const blog = this.$store.getters["blogDetail"].blog;
      this.title = blog.title;
      this.body = blog.body;
    }
  },
  methods: {
    async onSubmit() {
      if (this.title.length < 3 || this.body.length < 10) {
        this.formIsValid = false;
        this.$route.path.includes("update");
        return;
      }

      try {
        if (this.updatePath) {
          const actionPayload = {
            id: this.$route.params.id,
            title: this.title,
            body: this.body,
          };
          await this.$store.dispatch("updateBlog", actionPayload);
        } else {
          const actionPayload = {
            title: this.title,
            body: this.body,
          };
          await this.$store.dispatch("createBlog", actionPayload);
        }
        this.$router.replace("/blogs");
      } catch (err) {
        this.error = err.message || "Service unavaliable now";
      }
    },
  },
};
</script>
