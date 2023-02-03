export default {
  namespaced: true,

  state: () => ({
    token: null,
    user: null,
  }),

  // getters
  getters: {
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
      return state.user ? state.user.role.permissions : [];
    },
  },
};
