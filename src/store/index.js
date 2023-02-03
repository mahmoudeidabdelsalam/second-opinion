import Vue from "vue";
import Vuex from "vuex";

// import modules
import login from "./modules/auth/login.store";
import logout from "./modules/auth/logout.store";
import user from "./modules/user/user.store";

// mixins
import responseHandler from "./modules/mixins/responseHandler.store";
import validationRules from "./modules/mixins/validationRules.store";
import loading from "./modules/mixins/loading.store";
import notifications from "./modules/mixins/notifications.store";
import translate from "./modules/mixins/translate.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    logout,
    user,

    responseHandler,
    validationRules,
    loading,
    notifications,
    translate,
  },
});
