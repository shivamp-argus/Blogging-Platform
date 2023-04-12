<template>
  <div>
    <h2>Username: {{ user.username }}</h2>
    <h6>Email: {{ user.email }}</h6>
    <hr />
    <div>
      <h4>My blogs</h4>

      <ul class="list-group">
        <router-link
          :to="'/blogs/' + blog.blogId"
          v-for="blog of user.blogs"
          :key="blog._id"
          class="list-group-item"
        >
          <li class="text-decoration-none text-dark">
            {{ blog.blogTitle }}
          </li>
        </router-link>
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
      return this.$store.getters['user'];
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
        await this.$store.dispatch('loadProfile');
      } catch (err) {
        this.error = err.message || 'You are not authenticated';
      }
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
</style>
