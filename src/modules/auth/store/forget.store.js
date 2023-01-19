// axios
import axios from "axios";

// state
const state = () => ({
  forgetPasswordModal: false,
  checkOtpModal: false,
  resetPasswordModal: false,
});

// getters
const getters = {
  forgetPasswordModal: (state) => state.forgetPasswordModal,
  checkOtpModal: (state) => state.checkOtpModal,
  resetPasswordModal: (state) => state.resetPasswordModal,
};

// actions
const actions = {
  // open forget password modal
  openForgetPasswordModal({ commit }) {
    commit("OPEN_FORGET_PASSWORD_MODAL");
  },

  // close forget password modal
  closeForgetPasswordModal({ commit }) {
    commit("CLOSE_FORGET_PASSWORD_MODAL");
  },

  // forget password
  async forgetPassword(_, username) {
    await axios
      .post("auth/forget-password", username)
      .then((response) => {
        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });

        // close forget password modal
        this.dispatch("forget/closeForgetPasswordModal");
        // open check otp modal
        this.dispatch("forget/openCheckOtpModal");
      })
      .catch((error) => {
        // show error notification
        this.dispatch("notifications/showNotification", {
          message: error.response.data.message,
          color: "red",
        });
      });
  },

  // open check otp modal
  openCheckOtpModal({ commit }) {
    commit("OPEN_CHECK_OTP_MODAL");
  },

  // close check otp modal
  closeCheckOtpModal({ commit }) {
    commit("CLOSE_CHECK_OTP_MODAL");
  },

  // check otp
  async checkOtp({ commit }, credentials) {
    await axios
      .post("auth/check-code", credentials)
      .then((response) => {
        // set token
        commit("SET_TOKEN", response.data.data.token);

        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });

        // close check otp modal
        this.dispatch("forget/closeCheckOtpModal");
        // open reset password modal
        this.dispatch("forget/openResetPasswordModal");
      })
      .catch((error) => {
        // show error notification
        this.dispatch("notifications/showNotification", {
          message: error.response.data.message,
          color: "red",
        });
      });
  },

  // open reset password modal
  openResetPasswordModal({ commit }) {
    commit("OPEN_RESET_PASSWORD_MODAL");
  },

  // close reset password modal
  closeResetPasswordModal({ commit }) {
    commit("CLOSE_RESET_PASSWORD_MODAL");
  },

  // reset password
  async resetPassword({ commit }, credentials) {
    await axios
      .post("auth/reset-password", credentials, {
        headers: {
          Authorization: `Bearer ${this.state.user.token}`,
        },
      })
      .then((response) => {
        // set token
        commit("SET_TOKEN", response.data.data.token);

        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });

        // attempt to login
        this.dispatch("login/attemptLogin", response.data.data.token);
      })
      .catch((error) => {
        // show error notification
        this.dispatch("notifications/showNotification", {
          message: error.response.data.message,
          color: "red",
        });
      });
  },
};

// mutations
const mutations = {
  // open forget password modal
  OPEN_FORGET_PASSWORD_MODAL(state) {
    state.forgetPasswordModal = true;
  },

  // close forget password modal
  CLOSE_FORGET_PASSWORD_MODAL(state) {
    state.forgetPasswordModal = false;
  },

  // open check otp modal
  OPEN_CHECK_OTP_MODAL(state) {
    state.checkOtpModal = true;
  },

  // close check otp modal
  CLOSE_CHECK_OTP_MODAL(state) {
    state.checkOtpModal = false;
  },

  // open reset password modal
  OPEN_RESET_PASSWORD_MODAL(state) {
    state.resetPasswordModal = true;
  },

  // close reset password modal
  CLOSE_RESET_PASSWORD_MODAL(state) {
    state.resetPasswordModal = false;
  },

  // set token in user module
  SET_TOKEN(_, token) {
    this.state.user.token = token;
  },

  // set user in user module
  SET_USER(_, user) {
    this.state.user.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
