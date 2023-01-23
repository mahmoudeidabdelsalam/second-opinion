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

    case "patientLogin/SET_TOKEN":
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

    case "register/SET_TOKEN":
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

    case "forget/SET_TOKEN":
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
    // getData
    case "crudOperations/getData":
      if (action.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
      break;

    // addData
    case "crudOperations/addData":
      if (action.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
      break;

    // updateData
    case "crudOperations/updateData":
      if (action.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
      break;

    // deleteData
    case "crudOperations/deleteData":
      if (action.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
      break;

    // logout
    case "logout/logout":
      if (action) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
      }
      break;

    // resetPassword
    case "forget/resetPassword":
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
