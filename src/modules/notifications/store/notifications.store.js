// state
const state = () => ({
  // notification
  notification: {
    show: false,
    message: "",
    color: "",
    timeout: 3000,
  },

  // notifications count
  notificationsCount: 0,

  // alert
  alert: {
    show: false,
    title: "",
    message: "",
    color: "",
    timeout: 5000,
  },
});

// getters
const getters = {
  // notification
  notification: (state) => state.notification,

  // notifications count
  notificationsCount: (state) => state.notificationsCount,

  // alert
  alert: (state) => state.alert,
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

  // increment notifications count
  incrementNotificationsCount({ commit }) {
    commit("INCREMENT_NOTIFICATIONS_COUNT");
  },

  // decrement notifications count
  decrementNotificationsCount({ commit }) {
    commit("DECREMENT_NOTIFICATIONS_COUNT");
  },

  // show alert
  showAlert({ commit }, payload) {
    commit("SHOW_ALERT", payload);
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

  // increment notifications count
  INCREMENT_NOTIFICATIONS_COUNT(state) {
    state.notificationsCount++;
  },

  // decrement notifications count
  DECREMENT_NOTIFICATIONS_COUNT(state) {
    state.notificationsCount--;
  },

  // show alert
  SHOW_ALERT(state, payload) {
    state.alert.show = true;
    state.alert.title = payload.title;
    state.alert.message = payload.message;
    state.alert.color = payload.color;
    // hide alert after alert timeout
    setTimeout(() => {
      state.alert.show = false;
    }, state.alert.timeout);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
