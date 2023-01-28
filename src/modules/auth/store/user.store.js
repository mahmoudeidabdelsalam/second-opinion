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

  // permissions
  permissions(state) {
    return state.user.role.permissions;
  },
};

export default {
  namespaced: true,
  state,
  getters,
};
