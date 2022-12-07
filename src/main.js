import Vue from "vue";
import App from "./App.vue";

// router
import router from "./router";

// vuex
import store from "./store";

// vuetify
import vuetify from "./plugins/vuetify";

import "./assets/style/main.scss";

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
