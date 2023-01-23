// axios
import axios from "axios";
// router
// import router from "@/router";

// state
const state = () => ({
  checkOtpModal: false,
});

// getters
const getters = {
  checkOtpModal: (state) => state.checkOtpModal,
};

// actions
const actions = {
  // register
  async register({ commit }, credentials) {
    await axios
      .post("auth/register", credentials)
      .then((response) => {
        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });

        // set token
        commit("SET_TOKEN", response.data.data.token);

        // open check otp modal
        this.dispatch("register/openCheckOtpModal");
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
  async checkOtp(_, data) {
    await axios
      .post("patient/auth/login", data)
      .then((response) => {
        // attempt to login and set token
        this.dispatch("login/attemptLogin", response.data.data.token);

        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });
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
  // set token in user module
  SET_TOKEN(_, token) {
    this.state.user.token = token;
  },

  // set user in user module
  SET_USER(_, user) {
    this.state.user.user = user;
  },

  // open check otp modal
  OPEN_CHECK_OTP_MODAL(state) {
    state.checkOtpModal = true;
  },

  // close check otp modal
  CLOSE_CHECK_OTP_MODAL(state) {
    state.checkOtpModal = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
