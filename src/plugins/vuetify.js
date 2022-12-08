import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3E7AB1",
        primary_bg: "#ebecfc",
        black: "#1c295d",
        secondary: "#697591",
        secondary_bg: "#ebecfc",
        error: "#FA6767",
        error_bg: "#f9ebeb",
        info: "#54c1fb",
        info_bg: "#eaf7ff",
        success: "#2bad77",
        success_bg: "#e9f7f2",
        warning: "#f97f26",
        warning_bg: "#fef6eb",
      },
    },
  },
});
