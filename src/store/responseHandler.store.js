// router
import router from "@/router";

// actions
const actions = {
  // handle response
  handleResponse(_, response) {
    if (response) {
      // switch condition for errors status code
      switch (response.status) {
        // success
        case 200:
        case 201:
        case 202:
          // show notification
          this.dispatch("notifications/showNotification", {
            message: response.data.message,
            color: "green",
          });
          break;

        case 401:
          // show notification
          this.dispatch("notifications/showNotification", {
            message: "برجاء تسجيل الدخول",
            color: "red",
          });
          // remove token from local storage
          localStorage.removeItem("token");
          // redirect to login page
          router.push({ name: "Login" });
          break;

        case 400:
        case 403:
        case 502:
          // show notification
          this.dispatch("notifications/showNotification", {
            message: response.data.message,
            color: "red",
          });
          break;

        case 404:
          // show notification
          this.dispatch("notifications/showNotification", {
            message: "الصفحة غير موجودة",
            color: "red",
          });
          break;

        case 422:
          this.errors = response.data.errors;
          for (let [, value] of Object.entries(this.errors)) {
            // show notification
            this.dispatch("notifications/showNotification", {
              message: value[0],
              color: "red",
            });
          }
          break;

        case 500:
          // show notification
          this.dispatch("notifications/showNotification", {
            message: "خطا غير معروف، حاول لاحقا",
            color: "red",
          });
          break;

        default:
          // show notification
          this.dispatch("notifications/showNotification", {
            message: "خطا فى الاتصال",
            color: "red",
          });
          break;
      }
    }
  },
};

export default {
  namespaced: true,
  actions,
};
