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
      // console.log(responseData);
      context.commit("setBlog", responseData);
    } catch (err) {
      console.log(err.message);
    }
  },
};
