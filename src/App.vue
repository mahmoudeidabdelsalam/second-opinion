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
      <!-- alert -->
      <alert />
      <audio ref="audio" muted style="display: none">
        <source
          src="https://dev.secondopinion.sa/sounds/alert-sound.wav"
          type="audio/ogg"
        />
        <source
          src="https://dev.secondopinion.sa/sounds/alert-sound.wav"
          type="audio/mpeg"
        />
      </audio>
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
    // alert component
    Alert: () => import("@/modules/notifications/components/Alert.vue"),
  },

  data: () => ({
    // account id
    account_id: null,
  }),

  computed: {
    // map getters
    ...mapGetters({
      authenticated: "user/authenticated",
      user: "user/userData",
    }),
  },

  created() {
    // subscribe to pusher
    this.subscribe();
  },

  // make watch on authenticated
  watch: {
    authenticated() {
      // subscribe to pusher
      this.subscribe();
    },
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
      // increment notifications count
      incrementNotificationsCount: "notifications/incrementNotificationsCount",

      // show alert
      showAlert: "notifications/showAlert",
    }),

    // translate method
    translate(lang) {
      // call translate action
      this.translateAction(lang);
    },

    // subscribe to pusher
    subscribe() {
      const pusher = new Pusher("a88e81fc7da12f099bbb", {
        cluster: "eu",
        channelAuthorization: {
          endpoint: "https://staging.drhealthclinics.com/broadcasting/auth",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            Accept: "application/json",
          },
        },
      });

      if (this.authenticated) {
        pusher.subscribe(`private-user.${this.user.account_id}.notifications`);
        pusher.bind("new-notification", (data) => {
          if (this.authenticated) {
            // assign account id
            this.account_id = this.user.account_id;

            // increment notifications count
            this.incrementNotificationsCount();

            // show alert
            this.showAlert({
              title: data.title,
              message: data.body,
              color: "primary",
            });

            // play notification sound
            this.$refs.audio.play();
          } else {
            // unsubscribe from pusher
            pusher.unsubscribe(`private-user.${this.account_id}.notifications`);
          }
        });
      } else {
        // unbind all events
        pusher.unbind_all();
      }
    },
  },
};
</script>
