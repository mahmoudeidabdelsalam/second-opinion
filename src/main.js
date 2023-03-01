import Vue from "vue";
import App from "./App.vue";

// router
import router from "./router";

// vuex
import store from "./store";
// subscriber for store
import "./store/modules/auth/subscriber";

// vuetify
import vuetify from "./plugins/vuetify";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// use
Vue.use(mavonEditor);

// i18n
import i18n from "./plugins/i18n";

// axios config
import axios from "./plugins/axios";

// styles
import "./assets/style/main.scss";

store.dispatch("login/checkIsLogin", localStorage.getItem("token")).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    i18n,
    axios,
    render: (h) => h(App),
  }).$mount("#app");
});
