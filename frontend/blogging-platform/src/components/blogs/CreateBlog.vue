<template>
  <!-- <div class="container">
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
  </div> -->
  <div class="container">
    <div class="login form">
      <header>Create Blog</header>
      <form @submit.prevent="onSubmit">
        <input
          type="text"
          placeholder="Enter your blog title"
          v-model.trim="title"
        />
        <textarea
          class="form-control"
          id="body"
          rows="3"
          placeholder="Start writing your blog from here..."
          v-model.trim="body"
        ></textarea>

        <div class="mb-3">
          <button type="submit" class="button" v-if="!updatePath">
            Create Blog
          </button>
          <button type="submit" class="button" v-else>Update Blog</button>
        </div>
        <p v-if="!formIsValid">
          Please enter valid email and password with length more than 6
          characters
        </p>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      body: '',
      formIsValid: true,
      error: null,
    };
  },
  computed: {
    updatePath() {
      return this.$route.path.includes('update');
    },
  },
  created() {
    if (this.$route.path.includes('update')) {
      const blog = this.$store.getters['blogDetail'].blog;
      this.title = blog.title;
      this.body = blog.body;
    }
  },
  methods: {
    async onSubmit() {
      if (this.title.length < 3 || this.body.length < 10) {
        this.formIsValid = false;
        this.$route.path.includes('update');
        return;
      }

      try {
        if (this.updatePath) {
          const actionPayload = {
            id: this.$route.params.id,
            title: this.title,
            body: this.body,
          };
          await this.$store.dispatch('updateBlog', actionPayload);
        } else {
          const actionPayload = {
            title: this.title,
            body: this.body,
          };
          await this.$store.dispatch('createBlog', actionPayload);
        }
        this.$router.replace('/blogs');
      } catch (err) {
        this.error = err.message || 'Service unavaliable now';
      }
    },
  },
};
</script>
<style scoped>
/* Import Google font - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
/* body {
  min-height: 100vh;
  width: 100%;
  background: #009579;
} */
.container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* max-width: 430px; */
  width: 100%;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.container .registration {
  display: none;
}
#check:checked ~ .registration {
  display: block;
}
#check:checked ~ .login {
  display: none;
}
#check {
  display: none;
}
.container .form {
  padding: 2rem;
}
.form header {
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.5rem;
}
.form input {
  height: 60px;
  width: 100%;
  padding: 0 15px;
  font-size: 17px;
  margin-bottom: 1.3rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}
button {
  height: 40px;
  width: 15%;
  padding: 0 15px;
  font-size: 17px;
  margin-bottom: 1.3rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}
.form textarea {
  height: 120px;
  width: 100%;
  padding: 0 15px;
  font-size: 17px;
  margin-bottom: 1.3rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}
.form input:focus,
button:focus,
textarea:focus {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}
.form a {
  font-size: 16px;
  color: #009579;
  text-decoration: none;
}
.form a:hover {
  text-decoration: underline;
}
.form input.button,
button.button {
  color: #fff;
  background: #009579;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 1.7rem;
  cursor: pointer;
  transition: 0.4s;
}
.form input.button:hover,
button.button:hover {
  background: #006653;
}
</style>
