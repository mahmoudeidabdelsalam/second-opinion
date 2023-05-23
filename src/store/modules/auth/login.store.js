// axios
import axios from "axios";
// router
import router from "@/router";

// actions
const actions = {
  // attempt to login
  async attemptLogin({ commit }, token) {
    if (token) {
      // set token in user module if token is provided
      commit("SET_TOKEN", token);
    }

    // check if token is set in user module
    if (!this.state.user.token) {
      return;
    }

    // try to fetch user profile
    await axios
      .get("auth/profile")
      .then((response) => {
        // set user in user module
        commit("SET_USER", response.data.data);

        localStorage.setItem("role", response.data.data.role.name);

        // redirect user depending on role
        switch (response.data.data.role.value) {
          case 4: // patient
            if (router.history.current.query.doctor) {
              router.push({
                name: "PublicDoctorsProfile",
                params: { id: router.history.current.query.doctor },
              });
            } else {
              router.push({ name: "Home" });
            }
            break;

          default:
            router.push({ name: "DashboardOverview" });
            break;
        }
      })
      .catch(() => {
        // remove token from user module
        commit("SET_TOKEN", null);

        // remove user from user module
        commit("SET_USER", null);
      });
  },

  // check if user is logged in
  async checkIsLogin({ commit }, token) {
    if (token) {
      // set token in user module if token is provided
      commit("SET_TOKEN", token);
    }

    // check if token is set in user module
    if (!this.state.user.token) {
      return;
    }

    // try to fetch user profile
    await axios
      .get("auth/profile")
      .then((response) => {
        // set user in user module
        commit("SET_USER", response.data.data);
      })
      .catch(() => {
        // remove token from user module
        commit("SET_TOKEN", null);

        // remove user from user module
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
