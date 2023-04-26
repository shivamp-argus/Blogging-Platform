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
    <form @submit.prevent="onSubmit">
      <div class="blog">
        <textarea
          type="text"
          class="title"
          placeholder="Blog title..."
          v-model.trim="title"
        ></textarea>
        <textarea
          type="text"
          class="article"
          placeholder="Start writing here..."
          v-model.trim="body"
        ></textarea>
      </div>

      <div class="mb-3 blog-options">
        <button
          type="submit"
          class="btn btn-primary dark publish-btn"
          v-if="!updatePath"
        >
          Publish
        </button>
        <button type="submit" class="btn btn-primary dark publish-btn" v-else>
          Update
        </button>
      </div>
    </form>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
body {
  background-color: #fff !important;
}
.container {
  margin-top: 5%;
  margin-left: 3%;
  font-family: 'poppins', sans-serif;
}
.banner {
  width: 100%;
  height: 400px;
  position: relative;
  background: #e7e7e7;
  background-size: cover;
  background-position: center;
}

.banner-upload-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.banner-upload-btn img {
  width: 20px;
}

.blog {
  width: 70vw;
  min-width: 400px;
  height: 100px;
  display: block;
  margin: auto;
  padding: 50px 0;
}

textarea::-webkit-scrollbar {
  width: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.title,
.article {
  width: 100%;
  min-height: 100px;
  height: auto;
  outline: none;
  font-size: 50px;
  font-weight: 600;
  color: #2d2d2d;
  resize: none;
  border: none;
  padding: 10px;
  border-radius: 10px;
}

.title::placeholder,
.article::placeholder {
  color: #2d2d2d;
}

.article {
  height: 400px;
  font-size: 20px;
  margin-top: 20px;
  line-height: 30px;
  font-weight: 500;
  padding-bottom: 100px;
  white-space: pre-wrap;
}

.blog-options {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;

  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
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
.btn.grey {
  background: #a5a5a5;
  color: #fff;
  margin-left: 20px;
  font-size: 14px;
}

/* .container {
 
  margin-top: 5%;
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
} */
</style>
