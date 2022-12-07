import Vue from "vue";
import App from "./App.vue";

// router
import router from "./router";

// vuex
import store from "./store";

// vuetify
import vuetify from "./plugins/vuetify";

// i18n
import i18n from "./plugins/i18n";

import "./assets/style/main.scss";

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
