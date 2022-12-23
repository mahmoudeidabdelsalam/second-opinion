import Vue from "vue";
import Vuex from "vuex";

// login module
import login from "@/modules/auth/store/login.store";

// logout module
import logout from "@/modules/auth/store/logout.store";

// user module
import user from "@/modules/auth/store/user.store";

// validation rules module
import validationRules from "./validationRules.store";

// translate module
import translate from "@/modules/translate/translate.store";

// crud operations module
import crudOperations from "@/modules/dashboard/store/crud-operations.store";

// notifications module
import notifications from "@/modules/notifications/store/notifications.store";

// errorsHandler module
import errorsHandler from "./errorsHandler.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    logout,
    user,
    validationRules,
    translate,
    crudOperations,
    notifications,
    errorsHandler,
  },
});
