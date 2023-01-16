<template>
  <v-app>
    <v-main>
      <router-view />
      <!-- notification -->
      <notification />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Notification: () =>
      import("./modules/notifications/components/notification.vue"),
  },

  mounted() {
    // set language if local storage has it and if not set it to ar by default and set direction to rtl
    if (localStorage.lang) {
      this.translate(localStorage.lang);
    } else {
      this.translate("ar");
    }
  },

  methods: {
    // map translate action
    ...mapActions({
      // translate action
      translateAction: "translate/setSystemLanguage",
    }),

    // translate method
    translate(lang) {
      // call translate action
      this.translateAction(lang);
    },
  },
};
</script>
