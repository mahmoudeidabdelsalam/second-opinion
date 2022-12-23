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
        // handle errors
        this.dispatch("errorsHandler/handleError", error);
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
        // handle errors
        this.dispatch("errorsHandler/handleError", error);
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
        // handle errors
        this.dispatch("errorsHandler/handleError", error);
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
        // handle errors
        this.dispatch("errorsHandler/handleError", error);
      });
  },

  // restoreData
  async restoreData(_, data) {
    return await axios
      .put(data.url + "/" + data.id + "/restore")
      .then((response) => {
        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });
      })
      .catch((error) => {
        // handle errors
        this.dispatch("errorsHandler/handleError", error);
      });
  },

  // updateStatus
  async updateStatus(_, data) {
    return await axios
      .post(data.url + "/" + data.id + "/update-status", data.data)
      .then((response) => {
        // show notification
        this.dispatch("notifications/showNotification", {
          message: response.data.message,
          color: "green",
        });
      })
      .catch((error) => {
        // handle errors
        this.dispatch("errorsHandler/handleError", error);
      });
  },

  // checkAvailableDates
  async checkAvailableDates(_, data) {
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
        // handle errors
        this.dispatch("errorsHandler/handleError", error);
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
