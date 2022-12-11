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

  // phone rules
  phoneRules: [
    (v) => !!v || "Phone is required",
    (v) => (v && v.length > 8) || "Phone must be at least 9 characters",
    (v) => (v && v.length < 20) || "Phone must be less than 20 characters",
    (v) => /^\d+$/.test(v) || "Phone must be a number",
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

  // description rules
  descriptionRules: [
    (v) => !!v || "Description is required",
    (v) => (v && v.length > 2) || "Description must be at least 3 characters",
    (v) =>
      (v && v.length < 255) || "Description must be less than 255 characters",
  ],

  // message rules
  messageRules: [
    (v) => !!v || "Message is required",
    (v) => (v && v.length > 2) || "Message must be at least 3 characters",
    (v) => (v && v.length < 255) || "Message must be less than 255 characters",
  ],

  // select rules
  selectRules: [(v) => !!v || "This field is required"],
});

// getters
const getters = {
  // fotm validation
  valid: (state) => state.valid,

  // name rules
  nameRules: (state) => state.nameRules,

  // email rules
  emailRules: (state) => state.emailRules,

  // phone rules
  phoneRules: (state) => state.phoneRules,

  // password rules
  passwordRules: (state) => state.passwordRules,

  // confirm password rules
  confirmPasswordRules: (state) => state.confirmPasswordRules,

  // description rules
  descriptionRules: (state) => state.descriptionRules,

  // message rules
  messageRules: (state) => state.messageRules,

  // select rules
  selectRules: (state) => state.selectRules,
};

export default {
  namespaced: true,
  state,
  getters,
};
