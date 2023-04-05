export default {
  async loadComments(context, payload) {
    try {
      const response = await fetch(`http://localhost:4000/comment/${payload}`);
      const responseData = await response.json();
      context.commit("setComments", responseData);
    } catch (err) {
      console.log(err.message);
    }
  },
  async addComment(context, payload) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/comment/${payload.blogId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            commentText: payload.commentText,
          }),
        }
      );
      const responseData = await response.json();

      const comments = context.getters["comments"].push(responseData);
      context.commit("setComments", comments);
    } catch (err) {
      console.log(err.message);
    }
  },
};
