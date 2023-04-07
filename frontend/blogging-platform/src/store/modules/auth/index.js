import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state() {
    return {
      userId: "",
      token: "",
      user: {
        username: "",
        email: "",
        blogs: [],
      },
    };
  },
  mutations,
  actions,
  getters,
};
