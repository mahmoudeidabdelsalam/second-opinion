// axios
import axios from "axios";
// router
import router from "@/router";

// actions
const actions = {
  // attempt to login
  async attemptLogin({ commit }, token) {
    if (token) {
      commit("SET_TOKEN", token);
    }

    if (!this.state.user.token) {
      return;
    }

    // try to fetch user
    await axios
      .get("auth/profile")
      .then((response) => {
        // set user
        commit("SET_USER", response.data.data);

        // redirect user depending on his role
        switch (response.data.data.role.value) {
          case 4: // patient
            router.push({ name: "Home" });
            break;

          default:
            router.push({ name: "DashboardOverview" });
            break;
        }
      })
      .catch(() => {
        // remove token
        commit("SET_TOKEN", null);
        // remove user
        commit("SET_USER", null);
      });
  },

  // check if user is logged in
  async checkIsLogin({ commit }, token) {
    if (token) {
      commit("SET_TOKEN", token);
    }

    if (!this.state.user.token) {
      return;
    }

    // try to fetch user
    await axios
      .get("auth/profile")
      .then((response) => {
        // set user
        commit("SET_USER", response.data.data);
      })
      .catch(() => {
        // remove token
        commit("SET_TOKEN", null);
        // remove user
        commit("SET_USER", null);
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
