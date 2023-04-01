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
};
