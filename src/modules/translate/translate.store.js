// i18n
import i18n from "@/plugins/i18n";
// vuetify
import vuetify from "@/plugins/vuetify";

// state
const state = () => ({
  systemLanguage: "",
  systemDirection: "",
});

// getters
const getters = {
  // system language
  systemLanguage: (state) => state.systemLanguage,

  // system direction
  systemDirection: (state) => state.systemDirection,
};

// actions
const actions = {
  // set system language
  setSystemLanguage({ commit }, language) {
    commit("SET_SYSTEM_LANGUAGE", language);
  },

  // set system direction
  setSystemDirection({ commit }, direction) {
    commit("SET_SYSTEM_DIRECTION", direction);
  },
};

// mutations
const mutations = {
  // set system language
  SET_SYSTEM_LANGUAGE(state, language) {
    state.systemLanguage = language;

    // change i18n language
    i18n.locale = language;
  },

  // set system direction
  SET_SYSTEM_DIRECTION(state, direction) {
    state.systemDirection = direction;

    // change vuetify direction
    vuetify.framework.rtl = direction === "rtl" ? true : false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
