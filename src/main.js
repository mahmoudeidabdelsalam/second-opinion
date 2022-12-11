import Vue from "vue";
import App from "./App.vue";

// router
import router from "./router";

// vuex
import store from "./store";
// subscriber for store
import "./modules/auth/store/subscriber";

// vuetify
import vuetify from "./plugins/vuetify";

// i18n
import i18n from "./plugins/i18n";

// axios config
import axios from "./plugins/axios";

// styles
import "./assets/style/main.scss";

new Vue({
  router,
  store,
  vuetify,
  i18n,
  axios,
  render: (h) => h(App),
}).$mount("#app");
