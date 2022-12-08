// state
const state = () => ({
  // fotm validation
  valid: true,

  // name rules
  nameRules: [
    (v) => !!v || "Name is required",
    (v) => (v && v.length > 2) || "Name must be at least 3 characters",
    (v) => (v && v.length < 255) || "Name must be less than 255 characters",
  ],

  // email rules
  emailRules: [
    (v) => !!v || "Email is required",
    (v) => /.+@.+\..+/.test(v) || "Email must be valid",
  ],

  // password rules
  passwordRules: [
    (v) => !!v || "Password is required",
    (v) => (v && v.length > 5) || "Password must be at least 6 characters",
  ],

  // confirm password rules
  confirmPasswordRules: [
    (v) => !!v || "Password confirmation is required",
    (v) =>
      (v && v.length > 5) ||
      "Password confirmation must be at least 6 characters",
  ],

  // message rules
  messageRules: [
    (v) => !!v || "Message is required",
    (v) => (v && v.length > 2) || "Message must be at least 3 characters",
    (v) => (v && v.length < 255) || "Message must be less than 255 characters",
  ],
});

// getters
const getters = {
  // fotm validation
  valid: (state) => state.valid,

  // name rules
  nameRules: (state) => state.nameRules,

  // email rules
  emailRules: (state) => state.emailRules,

  // password rules
  passwordRules: (state) => state.passwordRules,

  // confirm password rules
  confirmPasswordRules: (state) => state.confirmPasswordRules,

  // message rules
  messageRules: (state) => state.messageRules,
};

export default {
  namespaced: true,
  state,
  getters,
};
