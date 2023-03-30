import { createStore } from "vuex";

import blogsModule from "./modules/blogs/index.js";

const store = createStore({
  modules: {
    blogs: blogsModule,
  },
});

export default store;
