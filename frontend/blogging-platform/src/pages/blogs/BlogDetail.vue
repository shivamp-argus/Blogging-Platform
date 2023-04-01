<template>
  <div class="container">
    <div class="card">
      <h2 class="card-header">
        {{ blogTitle }}
      </h2>
      <div class="card-body">
        <h3>
          <span>This is id:{{ id }}</span>
        </h3>
        <p>{{ blogBody }}</p>
      </div>
      <button class="btn btn-dark card-footer" @click="toggleComments">
        Comments
      </button>

      <ul class="list-group list-group-flush" v-if="hasComments === true">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      error: null,
      hasComments: true,
    };
  },
  computed: {
    blogBody() {
      console.log("hello from body");
      return this.$store.getters["blogDetail"].blog.body;
    },
    blogTitle() {
      return this.$store.getters["blogDetail"].blog.title;
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
      console.log(this.hasComments);
      return !this.hasComments;
    },
  },
};
</script>
<style></style>
