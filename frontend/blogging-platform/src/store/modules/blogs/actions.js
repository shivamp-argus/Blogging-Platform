export default {
  async loadBlogs(context, payload) {
    try {
      const response = await fetch(
        `http://localhost:4000/blog?page=${payload.page}`
      );
      const responseData = await response.json();

      context.commit('setBlogs', responseData.blogs);
      context.commit('setPages', responseData.count);
    } catch (err) {
      console.log(err.message);
    }
  },
  async loadBlog(context, payload) {
    try {
      const response = await fetch(`http://localhost:4000/blog/${payload}`);
      const responseData = await response.json();

      context.commit('setBlog', responseData);
    } catch (err) {
      console.log(err.message);
    }
  },

  async createBlog(_, payload) {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:4000/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: payload.title,
          body: payload.body,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  },
  async deleteBlog(_, payload) {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:4000/blog/${payload.blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  async updateBlog(_, payload) {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:4000/blog/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: payload.title,
          body: payload.body,
        }),
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
