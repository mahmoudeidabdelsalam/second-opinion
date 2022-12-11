// state
const state = () => ({
  token: null,
  user: null,
});

// getters
const getters = {
  // authenticated?
  authenticated(state) {
    return state.token && state.user;
  },

  // user data
  userData(state) {
    return state.user;
  },

  // verified?
  verified(state) {
    return state.user && state.user.verified;
  },
};

export default {
  namespaced: true,
  state,
  getters,
};
