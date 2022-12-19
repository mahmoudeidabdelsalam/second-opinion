// axios
import axios from "axios";
// router
import router from "@/router";

// actions
const actions = {
  // login
  async login({ dispatch }, credentials) {
    await axios
      .post("auth/login", credentials)
      .then((response) => {
        // attempt to login and set token
        dispatch("attemptLogin", response.data.data.token);

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

  // attempt to login
  async attemptLogin({ commit }, token) {
    if (token) {
      commit("SET_TOKEN", token);
    }

    if (!this.state.user.token) {
      return;
    }

    try {
      // try to fetch user
      let response = await axios.get("auth/profile");
      // set user
      commit("SET_USER", response.data.data);

      // check if user is verified before redirecting
      // if (response.data.data.verified) {
      // redirect user depending on his role
      switch (response.data.data.role.value) {
        case 1: // super admin
          router.push({ name: "Departments" });
          break;
      }
      // } else {
      //   // redirect to verification page
      //   router.push({
      //     name: "Verify",
      //     query: { email: response.data.data.email },
      //   });
      // }
    } catch (e) {
      // remove token
      commit("SET_TOKEN", null);
      // remove user
      commit("SET_USER", null);
    }
  },

  // check if user is logged in
  async checkIsLogin({ commit }, token) {
    if (token) {
      commit("SET_TOKEN", token);
    }

    if (!this.state.user.token) {
      return;
    }

    try {
      // try to fetch user
      let response = await axios.get("auth/profile");
      // set user
      commit("SET_USER", response.data.data);
    } catch (e) {
      // remove token
      commit("SET_TOKEN", null);
      // remove user
      commit("SET_USER", null);
    }
  },
};

// mutations
const mutations = {
  // set token in user module
  SET_TOKEN(_, token) {
    console.log(token);
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
