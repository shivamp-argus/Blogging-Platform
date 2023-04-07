<template>
  <div>
    <h2>Username: {{ user.username }}</h2>
    <h6>Email: {{ user.email }}</h6>
    <hr />
    <div>
      <h4>My blogs</h4>

      <ul class="list-group">
        <li v-for="blog of user.blogs" :key="blog._id" class="list-group-item">
          <router-link
            :to="blogDetailLink + '/' + blog.blogId"
            class="text-decoration-none text-dark"
            >{{ blog.blogTitle }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
    blogDetailLink() {
      return this.$route.path;
    },
  },
  updated() {
    this.loadUser();
  },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      try {
        await this.$store.dispatch("loadProfile");
      } catch (err) {
        this.error = err.message || "You are not authenticated";
      }
    },
  },
};
</script>
