// axios
import axios from "axios";
// router
import router from "@/router";
// pusher
// import Pusher from "pusher-js";

// actions
const actions = {
  // logout
  async logout({ commit }) {
    await axios
      .delete("auth/logout")
      .then((response) => {
        // unbind pusher
        // let pusher = new Pusher("a88e81fc7da12f099bbb", {
        //   cluster: "eu",
        //   channelAuthorization: {
        //     endpoint: "https://staging.drhealthclinics.com/broadcasting/auth",
        //     headers: {
        //       Authorization: `Bearer ${localStorage.token}`,
        //       Accept: "application/json",
        //     },
        //   },
        // });
        // pusher.unbind("new-notification");

        //--------------------//

        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });

        // remove token from local storage
        localStorage.removeItem("token");

        // remove token
        commit("SET_TOKEN", null);
        // remove user
        commit("SET_USER", null);

        // redirect user to home page
        router.push({ name: "Home" });
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
};

export default {
  namespaced: true,
  actions,
  mutations,
};
