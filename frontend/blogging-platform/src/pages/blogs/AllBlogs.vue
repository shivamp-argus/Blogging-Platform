<template>
  <div class="container">
    <div v-if="hasBlogs">
      <blog-item
        v-for="blog of blogs"
        :key="blog._id"
        :id="blog._id"
        :body="blog.body"
        :title="blog.title"
        class="mt-2"
      ></blog-item>
    </div>
    <div v-else>
      <h2>Sorry no blogs found</h2>
      <h3>Why don't you create one</h3>
      <router-link to="/blogs/create">Create Blog</router-link>
    </div>
  </div>
</template>
<script>
import BlogItem from "../../components/blogs/BlogItem.vue";
export default {
  components: {
    "blog-item": BlogItem,
  },
  data() {
    return {
      error: null,
      blogsLoaded: false,
    };
  },
  computed: {
    blogs() {
      return this.$store.getters["blogs"];
    },
    hasBlogs() {
      return this.blogs.length > 0;
    },
  },
  created() {
    if (!this.blogsLoaded) {
      // console.log("hello from created");
      this.loadBlogs();
    }
  },
  methods: {
    async loadBlogs() {
      try {
        await this.$store.dispatch("loadBlogs");
        this.blogsLoaded = true;
      } catch (err) {
        console.log(err.message);
        this.error = err.message || "Blogs cannot be loaded at this moment";
      }
    },
  },
};
</script>
<style></style>
