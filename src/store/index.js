import Vue from "vue";
import Vuex from "vuex";

// register module
import register from "@/modules/auth/store/register.store";

// login module
import login from "@/modules/auth/store/login.store";

// forget module
import forget from "@/modules/auth/store/forget.store";

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
    register,
    login,
    forget,
    logout,
    user,
    validationRules,
    translate,
    crudOperations,
    notifications,
    errorsHandler,
  },
});
