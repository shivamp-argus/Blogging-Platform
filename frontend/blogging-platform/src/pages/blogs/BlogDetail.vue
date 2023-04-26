<template>
  <!-- <div class="container">
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
            v-if="updateAllowed"
          >
            Delete Blog
          </button>
          <router-link
            class="btn btn-dark card-footer ms-3 float-end"
            :to="updateRoute"
            v-if="updateAllowed"
          >
            Update Blog
          </router-link>
        </span>
      </div>

      <ul class="list-group list-group-flush" v-if="hasComments === true">
        <comment-list :id="id"></comment-list>
      </ul>
    </div>
  </div> -->
  <div class="bg-fifty-percent top"></div>
  <div class="bg-fifty-percent bottom"></div>
  <div class="container">
    <div class="blog-item">
      <div class="blog-content">
        <h5>Feb. 2017</h5>
        <h3>{{ blog.title }}</h3>
        <p>
          {{ blog.body }}
        </p>
        <button class="btn dark me-3" @click="toggleComments">
          View Comments
        </button>

        <span v-if="isAuthenticated">
          <add-comment
            ><button
              class="btn dark"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Comment
            </button>
          </add-comment>
          <button
            class="btn dark ms-3 float-end"
            @click="deleteBlog"
            v-if="updateAllowed"
          >
            Delete Blog
          </button>

          <router-link
            class="btn dark ms-3 float-end"
            :to="updateRoute"
            v-if="updateAllowed"
          >
            Update Blog
          </router-link>
        </span>

        <ul class="list-group list-group-flush" v-if="hasComments === true">
          <comment-list :id="id"></comment-list>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import AddComment from '../../components/blogs/AddComment.vue';
import CommentList from '../../components/blogs/CommentsList.vue';
export default {
  components: {
    'comment-list': CommentList,
    'add-comment': AddComment,
  },
  props: ['id'],
  data() {
    return {
      error: null,
      hasComments: false,
      viewAddComment: false,
    };
  },
  computed: {
    blog() {
      return this.$store.getters['blogDetail'].blog;
    },
    isAuthenticated() {
      return this.$store.getters['isAuthenticated'];
    },
    updateRoute() {
      return this.$route.path + '/update';
    },
    updateAllowed() {
      const blogUserId = this.$store.getters['blogDetail'].blog.userId;
      return blogUserId === localStorage.getItem('userId');
    },
  },
  created() {
    this.blogDetail();
  },
  methods: {
    async blogDetail() {
      try {
        await this.$store.dispatch('loadBlog', this.id);
      } catch (err) {
        this.error = err.message || 'Blog cannot be loaded at this moment';
      }
    },
    toggleComments() {
      this.hasComments = !this.hasComments;
    },
    async deleteBlog() {
      try {
        await this.$store.dispatch('deleteBlog', {
          blogId: this.id,
          blog: this.blog,
        });
        this.$router.replace('/blogs');
      } catch (err) {
        this.error = err.message || 'You are not allowed';
      }
    },
    async updateBlog() {
      try {
        await this.$store.dispatch('updateBlog', this.id);
      } catch (err) {
        this.error = err.message || 'You are not allowed to update';
      }
    },
  },
};
</script>
<style scoped>
.container {
  margin-top: 8%;
  margin-left: 8%;
}
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400');

h3 {
  font-size: 1.5em;
  text-transform: uppercase;
  font-weight: 400;
  font-style: normal;
  margin: 0 0 0 0;
}

h5 {
  font-size: 0.75em;
  text-transform: uppercase;
  font-weight: 300;
  font-style: normal;
  margin: 0 0 10px 0;
  color: #bebebe;
}

.bg-fifty-percent {
  position: fixed;
  width: 100%;
  height: 50vh;
  z-index: -1;
}
.bg-fifty-percent.top {
  top: 0;
  background-color: #b8e7e1;
}
.bg-fifty-percent.bottom {
  top: 50vh;
  background-color: #ffeeb3;
}

.container {
  width: 100%;

  height: auto;
  margin-top: 8%;
}
.container .blog-item {
  position: relative;
  width: 100%;
  min-height: 200px;
  height: auto;
  background-color: #ffffff;
  overflow: hidden;
  border-radius: 10px;
  margin: 0 0 30px 0;
}
.container .blog-item .blog-content {
  width: 100%;
  height: 100%;

  padding: 30px;
}
.container .blog-item .blog-content p {
  line-height: 1.5em;
}

.btn {
  border: none;
  outline: none;
  cursor: pointer;
}
.btn.dark {
  background: #1b1b1b;
  color: #fff;
}
</style>
