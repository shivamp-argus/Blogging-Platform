export default {
  blogs(state) {
    return state.blogs;
  },
  blogDetail(state) {
    return state.blog;
  },
  commentUser(state) {
    return state.blog.comments;
  },
};
