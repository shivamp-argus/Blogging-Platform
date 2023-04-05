<template>
  <div class="container">
    <form @submit.prevent="addBlog">
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
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      body: "",
      formIsValid: true,
      error: null,
    };
  },
  methods: {
    async addBlog() {
      if (this.title.length < 3 || this.body.length < 10) {
        this.formIsValid = false;
        return;
      }
      const actionPayload = {
        title: this.title,
        body: this.body,
      };
      try {
        await this.$store.dispatch("createBlog", actionPayload);
        this.$router.replace("/blogs");
      } catch (err) {
        this.error = err.message || "Service unavaliable now";
      }
    },
  },
};
</script>
