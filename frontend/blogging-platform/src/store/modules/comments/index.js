import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state() {
    return {
      comments: [],
      // userCom: [],
    };
  },
  mutations,
  getters,
  actions,
};
