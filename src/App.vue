<template>
  <v-app>
    <v-main>
      <!-- loading -->
      <loading />
      <!-- request loading -->
      <request-loading />
      <!-- router view -->
      <router-view />
      <!-- notification -->
      <notification />
    </v-main>
  </v-app>
</template>

<script>
import Pusher from "pusher-js"; // import Pusher

import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    // loading component
    Loading: () => import("@/modules/loading/components/Loading.vue"),
    // request loading component
    RequestLoading: () =>
      import("@/modules/loading/components/RequestLoading.vue"),
    // notification component
    Notification: () =>
      import("@/modules/notifications/components/notification.vue"),
  },

  created() {
    // subscribe to pusher
    this.subscribe();
  },

  computed: {
    // map getters
    ...mapGetters({
      authenticated: "user/authenticated",
      user: "user/userData",
    }),
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

    // subscribe to pusher
    subscribe() {
      if (this.authenticated) {
        let pusher = new Pusher("a88e81fc7da12f099bbb", {
          cluster: "eu",
          channelAuthorization: {
            endpoint: "https://staging.drhealthclinics.com/broadcasting/auth",
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
              Accept: "application/json",
            },
          },
        });
        pusher.subscribe(`private-user.${this.user.account_id}.notifications`);
        pusher.bind("new-notification", (data) => {
          console.log(data);
        });
      }
    },
  },
};
</script>
