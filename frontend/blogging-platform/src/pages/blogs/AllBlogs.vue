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
      <nav class="">
        <ul class="pagination">
          <li class="page-item" v-if="minCount">
            <router-link
              :to="{
                path: this.$route.path,
                query: {
                  page:
                    this.$route.query.page > 1 ? this.$route.query.page - 1 : 1,
                },
              }"
              class="page-link"
              >Previous</router-link
            >
          </li>
          <li class="page-item" v-for="countNumber in count" :key="countNumber">
            <router-link
              :to="{ path: this.$route.path, query: { page: countNumber } }"
              class="page-link"
              >{{ countNumber }}</router-link
            >
          </li>
          <li class="page-item" v-if="maxCount">
            <router-link
              :to="{
                path: this.$route.path,
                query: {
                  page: 1 + +this.$route.query.page,
                },
              }"
              class="page-link"
              >Next</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
    <div v-else>
      <h2>Sorry no blogs found</h2>
      <h3>Why don't you create one</h3>
      <router-link to="/blogs/create">Create Blog</router-link>
    </div>
  </div>
</template>
<script>
import BlogItem from '../../components/blogs/BlogItem.vue';
export default {
  components: {
    'blog-item': BlogItem,
  },
  data() {
    return {
      error: null,
      blogsLoaded: false,
    };
  },
  computed: {
    blogs() {
      return this.$store.getters['blogs'];
    },
    hasBlogs() {
      return this.blogs.length > 0;
    },
    currentRoute() {
      return this.$route.query.page;
    },
    count() {
      return this.$store.getters['count'];
    },
    maxCount() {
      if (this.$route.query.page == this.count) {
        return false;
      }
      return true;
    },
    minCount() {
      if (this.$route.query.page == 1) {
        return false;
      }
      return true;
    },
  },
  created() {
    if (!this.blogsLoaded) {
      // console.log("hello from created");
      this.loadBlogs();
    }
  },
  watch: {
    currentRoute() {
      this.loadBlogs();
    },
  },
  methods: {
    async loadBlogs() {
      try {
        await this.$store.dispatch('loadBlogs', {
          page: this.$route.query.page,
        });
        this.blogsLoaded = true;
      } catch (err) {
        this.error = err.message || 'Blogs cannot be loaded at this moment';
      }
    },
    // previousRoute() {
    //   router.replace({
    //     path: this.$route.path,
    //     query: { page: this.$route.query.page - 1 },
    //   });
    // },
  },
};
</script>
<style></style>
