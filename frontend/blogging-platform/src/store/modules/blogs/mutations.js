export default {
  setBlogs(state, payload) {
    state.blogs = payload;
  },
  setBlog(state, payload) {
    state.blog = payload;
  },
  deleteBlog(state, payload) {
    const index = state.blogs.findIndex((blog) => blog._id.equals(payload._id));
    state.blogs = state.blogs.slice(index, 1);
  },
};
