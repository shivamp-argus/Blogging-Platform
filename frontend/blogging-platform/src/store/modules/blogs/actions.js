export default {
  async loadBlogs(context) {
    try {
      const response = await fetch("http://localhost:4000/blog");
      const responseData = await response.json();

      context.commit("setBlogs", responseData);
    } catch (err) {
      console.log(err.message);
    }
  },
  async loadBlog(context, payload) {
    try {
      const response = await fetch(`http://localhost:4000/blog/${payload}`);
      const responseData = await response.json();

      context.commit("setBlog", responseData);
    } catch (err) {
      console.log(err.message);
    }
  },
  // async loadUser() {
  //   try {
  //     const userId = this.$store.getters.commentUser;

  //     console.log(userId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  async createBlog(context, payload) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: payload.title,
          body: payload.body,
        }),
      });
      const responseData = await response.json();
      // console.log(responseData);
      const blogs = context.getters["blogs"].push(responseData);
      context.commit("setBlogs", blogs);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteBlog(context, payload) {
    try {
      const token = localStorage.getItem("token");
      // const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:4000/blog/${payload}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      // const blogs = context.getters["blogs"];

      context.commit("setBlogs", responseData);
    } catch (err) {
      console.log(err.message);
    }
  },
};
