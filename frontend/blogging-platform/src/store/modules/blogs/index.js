import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state() {
    return {
      blogs: [],
      blog: {
        blog: {
          title: "",
          body: "",
        },
        comments: [],
      },
    };
  },
  mutations,
  getters,
  actions,
};
