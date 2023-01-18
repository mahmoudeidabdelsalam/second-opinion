// axios
import axios from "axios";

// actions
const actions = {
  // forget password
  async forgetPassword(_, credentials) {
    await axios
      .post("auth/forget-password", credentials)
      .then((response) => {
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

  // check otp
  async checkOtp(_, credentials) {
    await axios
      .post("auth/check-code", credentials)
      .then((response) => {
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

export default {
  namespaced: true,
  actions,
};
