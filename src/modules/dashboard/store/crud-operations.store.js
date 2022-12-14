// axios
import axios from "axios";

// actions
const actions = {
  // getData
  async getData(_, apiUrl) {
    return await axios
      .get(apiUrl)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        // show error notification
        this.dispatch("notifications/showNotification", {
          message: error.response.data.message,
          color: "red",
        });
      });
  },

  // addData
  async addData(_, data) {
    return await axios
      .post(data.url, data.data)
      .then((response) => {
        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });

        return response.data.data;
      })
      .catch((error) => {
        // show error notification
        this.dispatch("notifications/showNotification", {
          message: error.response.data.message,
          color: "red",
        });
      });
  },

  // bindData
  async bindData(_, apiUrl) {
    return await axios
      .get(apiUrl)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        // show error notification
        this.dispatch("notifications/showNotification", {
          message: error.response.data.message,
          color: "red",
        });
      });
  },

  // updateData
  async updateData(_, data) {
    return await axios
      .post(data.url, data.data)
      .then((response) => {
        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });

        return response.data.data;
      })
      .catch((error) => {
        // show error notification
        this.dispatch("notifications/showNotification", {
          message: error.response.data.message,
          color: "red",
        });
      });
  },

  // deleteData
  async deleteData(_, data) {
    return await axios
      .delete(data.url + "/" + data.id)
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
