// axios
import axios from "axios";

// actions
const actions = {
  // getData
  async getData(_, credentials) {
    await axios
      .get(credentials)
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

// mutations
const mutations = {};

export default {
  namespaced: true,
  actions,
  mutations,
};
