// axios
import axios from "axios";

// actions
const actions = {
  // update profile
  async updateProfile(_, data) {
    await axios
      .put("patient/profile", data)
      .then((response) => {
        // update user object in user store
        this.commit("login/SET_USER", response.data.data);
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
const mutations = {};

export default {
  namespaced: true,
  actions,
  mutations,
};
