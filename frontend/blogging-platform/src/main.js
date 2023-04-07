import { createApp } from "vue";
import { createVuetify } from "vuetify/lib/framework.mjs";

import App from "./App.vue";
import router from "./router.js";
import store from "./store";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

app.use(router);
app.use(store);
app.use(vuetify);

app.mount("#app");
