// state
const state = () => ({
  loading: false,
});

// getters
const getters = {
  // get loading state
  requestLoading: (state) => state.loading,
};

// actions
const actions = {
  // show notification
  showNotification({ commit }) {
    commit("SHOW_NOTIFICATION");
  },
};

// mutations
const mutations = {
  // show notification
  SHOW_NOTIFICATION(state) {
    state.loading = true;

    // hide notification after notification timeout
    setTimeout(() => {
      state.loading = false;
    }, 10000);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
