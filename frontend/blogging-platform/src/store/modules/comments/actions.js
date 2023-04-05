export default {
  async loadComments(context, payload) {
    try {
      const response = await fetch(`http://localhost:4000/comment/${payload}`);
      const responseData = await response.json();
      context.commit("setComments", responseData);

      // context.commit("setUserCom", { ...responseData.commentDetail });
    } catch (err) {
      console.log(err.message);
    }
  },
};
