// router
import router from "@/router";

// actions
const actions = {
  // handleError
  handleError(_, error) {
    if (error.response) {
      // switch condition for errors status code
      switch (error.response.status) {
        case 401:
          // show notification
          this.dispatch("notifications/showNotification", {
            message: "برجاء تسجيل الدخول",
            color: "red",
          });
          // clear localStorage
          localStorage.clear();
          // redirect to login page
          router.push({ name: "Login" });
          break;

        case 400:
        case 403:
        case 502:
          // show notification
          this.dispatch("notifications/showNotification", {
            message: error.response.data.message,
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
          this.errors = error.response.data.errors;
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
