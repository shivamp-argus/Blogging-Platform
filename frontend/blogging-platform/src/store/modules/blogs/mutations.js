export default {
  setBlogs(state, payload) {
    state.blogs = payload;
    // console.log("from setBlogs", state.blogs);
  },
  setBlog(state, payload) {
    state.blog = payload;
  },
  deleteBlog(state, payload) {
    const index = state.blogs.findIndex((blog) => blog._id.equals(payload._id));
    console.log(index);
    state.blogs = state.blogs.slice(index, 1);
    console.log(state.blogs);
  },
};
