import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#008ad0",
        primary_bg: "#e6eff7",
        primary_dark: "#235787",
        black: "#1c295d",
        secondary: "#697591",
        secondary_bg: "#e6eff7",
        error: "#FA6767",
        error_bg: "#f9ebeb",
        info: "#54c1fb",
        info_bg: "#eaf7ff",
        success: "#2bad77",
        success_bg: "#e9f7f2",
        warning: "#f97f26",
        warning_bg: "#fef6eb",
        grey: "#8e8f8f",
        grey_dark: "#606161",
        red: "#ac4a4a",
        red_dark: "#8A0000",
      },
    },
  },
});
