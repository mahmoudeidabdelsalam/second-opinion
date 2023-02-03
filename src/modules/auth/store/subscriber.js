import store from "@/store";
import axios from "axios";

// subscribe to store mutations
store.subscribe((mutation) => {
  switch (mutation.type) {
    case "register/SET_TOKEN":
    case "login/SET_TOKEN":
    case "logout/SET_TOKEN":
      // if mutation payload is not null
      if (mutation.payload) {
        // set axios default header Authorization to Bearer token
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload}`;

        // set localStorage token to mutation payload
        localStorage.setItem("token", mutation.payload);
      } else {
        // else set axios default header Authorization to null
        axios.defaults.headers.common["Authorization"] = null;

        // remove localStorage token
        localStorage.removeItem("token");
      }
      break;
  }
});
