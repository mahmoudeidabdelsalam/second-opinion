import Vue from "vue";
import Vuex from "vuex";

// login module
// import login from "@/modules/auth/login.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // login,
  },

  state: {
    test: "test",
  },
});
