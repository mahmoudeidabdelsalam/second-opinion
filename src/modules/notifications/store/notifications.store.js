// state
const state = () => ({
  notification: {
    show: false,
    message: "",
    color: "",
    timeout: 3000,
  },

  // notifications count
  notificationsCount: 0,
});

// getters
const getters = {
  // notification
  notification: (state) => state.notification,

  // notifications count
  notificationsCount: (state) => state.notificationsCount,
};

// actions
const actions = {
  // show notification
  showNotification({ commit }, payload) {
    commit("SHOW_NOTIFICATION", payload);
  },

  // set notifications count
  setNotificationsCount({ commit }, payload) {
    commit("SET_NOTIFICATIONS_COUNT", payload);
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

  // set notifications count
  SET_NOTIFICATIONS_COUNT(state, payload) {
    state.notificationsCount = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
