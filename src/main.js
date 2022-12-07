import Vue from "vue";
import App from "./App.vue";

// router
import router from "./router";

// vuetify
import vuetify from "./plugins/vuetify";

import "./assets/style/main.scss";

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
