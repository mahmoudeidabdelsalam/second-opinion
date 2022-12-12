import store from "@/store";
import axios from "axios";

// subscribe to store mutations
store.subscribe((mutation) => {
  switch (mutation.type) {
    case "login/SET_TOKEN":
      if (mutation.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload}`;
        localStorage.setItem("token", mutation.payload);
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token");
      }
      break;
  }
});

// subscribe to store actions
store.subscribeAction((action) => {
  switch (action.type) {
    case "crudOperations/getData":
      if (action.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
      break;
  }
});
