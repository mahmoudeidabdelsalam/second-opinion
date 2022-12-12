// state
const state = () => ({
  notification: {
    show: false,
    message: "",
    color: "",
    timeout: 3000,
  },
});

// getters
const getters = {
  // notification
  notification: (state) => state.notification,
};

// actions
const actions = {
  // show notification
  showNotification({ commit }, payload) {
    commit("SHOW_NOTIFICATION", payload);
  },
};

// mutations
const mutations = {
  // show notification
  SHOW_NOTIFICATION(state, payload) {
    state.notification.show = true;
    state.notification.message = payload.message;
    state.notification.color = payload.color;
    // hide notification after notification timeout
    setTimeout(() => {
      state.notification.show = false;
    }, state.notification.timeout);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
