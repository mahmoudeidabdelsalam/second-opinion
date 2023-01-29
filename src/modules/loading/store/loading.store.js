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
  // show request loading
  showRequestLoading({ commit }) {
    commit("SHOW_REQUEST_LOADING");
  },

  // hide request loading
  hideRequestLoading({ commit }) {
    commit("HIDE_REQUEST_LOADING");
  },
};

// mutations
const mutations = {
  // show request loading
  SHOW_REQUEST_LOADING(state) {
    state.loading = true;

    // hide request loading after 10 seconds
    setTimeout(() => {
      state.loading = false;
    }, 10000);
  },

  // hide request loading
  HIDE_REQUEST_LOADING(state) {
    state.loading = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
