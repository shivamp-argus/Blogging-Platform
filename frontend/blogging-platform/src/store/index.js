import { createStore } from "vuex";

import blogsModule from "./modules/blogs/index.js";
import authModule from "./modules/auth/index.js";
import commentsModule from "./modules/comments/index.js";

const store = createStore({
  modules: {
    blogs: blogsModule,
    auth: authModule,
    comments: commentsModule,
  },
});

export default store;
