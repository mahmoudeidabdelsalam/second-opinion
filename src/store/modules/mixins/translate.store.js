// i18n
import i18n from "@/plugins/i18n";
// vuetify
import vuetify from "@/plugins/vuetify";

export default {
  namespaced: true,

  // state
  state: () => ({
    systemLanguage: "",
    systemDirection: "",
  }),

  // getters
  getters: {
    // system language
    systemLanguage: (state) => state.systemLanguage,
    // system direction
    systemDirection: (state) => state.systemDirection,
  },

  // actions
  actions: {
    // set system language
    setSystemLanguage({ commit }, language) {
      commit("SET_SYSTEM_LANGUAGE", language);
    },
  },

  // mutations
  mutations: {
    // set system language
    SET_SYSTEM_LANGUAGE(state, language) {
      // set state
      state.systemLanguage = language;
      state.systemDirection = language === "ar" ? "rtl" : "ltr";

      // change i18n language
      i18n.locale = language;

      // change vuetify direction
      vuetify.framework.rtl = language === "ar" ? true : false;

      // set html direction
      document.querySelector("html").setAttribute("dir", state.systemDirection);

      // set html lang
      document.querySelector("html").setAttribute("lang", state.systemLanguage);

      // set local storage language
      localStorage.setItem("lang", state.systemLanguage);
    },
  },
};
