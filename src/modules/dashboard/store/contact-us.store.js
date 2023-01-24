
// axios
import axios from "axios";

// actions
const actions = {
  // send Messages
  async sendMessages(_, data) {
    return await axios
      .post(data.url, data.data)
      .then((response) => {
        // show notification

        if(response.data.is_valid === true){
          this.dispatch("notifications/showNotification", {
            message: "Thanks for contacting us! We will get in touch with you shortly.",
            color: "green",
          });
        }

        return response.data.is_valid;
      })
      .catch((error) => {
        // handle errors
        this.dispatch("errorsHandler/handleError", error);
      });
  },
  
};

export default {
  namespaced: true,
  actions,
};
