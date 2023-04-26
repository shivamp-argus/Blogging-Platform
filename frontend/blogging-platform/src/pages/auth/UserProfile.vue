<template>
  <div class="container">
    <div class="profile">
      <h2>Username: {{ user.username }}</h2>
      <span>
        <h6 class="d-inline">
          <BIconEnvelopeAt /> Email: {{ user.email }}
        </h6></span
      >
    </div>
    <hr />

    <div>
      <h1 class="label">My Blogs</h1>
      <p v-if="!isBlogs" class="label">Hey you don't have any blogs</p>
      <div class="card-wrapper row justify-content-center">
        <div
          class="blog-card col-5 offset-2"
          v-for="blog of user.blogs"
          :key="blog._id"
        >
          <div class="blog-card__details">
            <div class="blog-card__title">
              {{ blog.blogTitle }}
            </div>

            <div class="blog-card__description text-container">
              <p class="truncate">{{ blog.blogBody }}</p>
            </div>

            <button class="blog-card__action">
              <span style="margin-right: 10px">
                <router-link
                  :to="'/blogs/' + blog.blogId"
                  class="list-group-item"
                  >Read More</router-link
                >
              </span>
              <i class="fa fa-angle-right"> </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BIconEnvelopeAt } from 'bootstrap-icons-vue';
export default {
  components: {
    BIconEnvelopeAt,
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    isBlogs() {
      if (this.user.blogs.length <= 0) {
        return false;
      }
      return true;
    },
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
.container {
  margin-top: 8%;
  margin-left: 8%;
}
.center {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.label {
  font-family: 'Quantico';
  text-align: center;
}

@media screen and (max-width: 320px) {
  .card-wrapper {
    flex-direction: column;
  }
}

.blog-card {
  height: auto;
  width: 500px;
  margin: 10px 15px 10px 15px;
}

.blog-card .blog-card__details {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.5);
}
.blog-card .blog-card__title {
  font-family: 'Quantico';
  font-size: 12px;
  text-transform: uppercase;
  color: #000;
}
.blog-card .blog-card__description {
  font-family: 'Open Sans';
  font-weight: 300;
  font-size: 12px;
  color: #888888;
}
.blog-card .blog-card__action {
  background: transparent;
  border: none;
  font-family: 'Quantico';
  font-weight: 700;
  text-transform: uppercase;
  text-align: left;
  color: #888888;
  cursor: pointer;
  font-size: 12px;
}
.text-container {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of initial lines to show */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
}
.profile h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #444;
  text-transform: uppercase;
}
.profile h6 {
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  color: #666;
  /* text-transform: uppercase; */
}

.profile:hover {
  background-color: #f5f5f5;
}

.profile h2:hover,
h6:hover {
  color: #555;
}

.profile h6:hover:before {
  color: #b2b2b2;
}
/* .product-card {
  width: 220px;
  margin-left: 15px;
  margin-right: 15px;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.5);
}
.product-card .product-card__thumbnail {
  width: 220px;
  height: 150px;
  object-fit: cover;
}
.product-card .product-card__details {
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
}
.product-card .product-card__title {
  font-family: 'Quantico';
  font-size: 12px;
  text-transform: uppercase;
  color: #000;
}
.product-card .product-card__description {
  font-family: 'Open Sans';
  font-weight: 300;
  font-size: 11px;
  color: #888888;
}
.product-card .product-card__action {
  width: 100%;
  padding: 5px;
  background: #727fff;
  border: 1px solid #727fff;
  border-radius: 2px;
  font-family: 'Quantico';
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
} */
</style>
