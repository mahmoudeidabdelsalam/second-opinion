<template>
  <v-app class="dashboard secondary_bg">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="secondary_bg"
      :right="systemDirection === 'rtl'"
    >
      <!-- sidebar -->
      <sidebar />
    </v-navigation-drawer>

    <v-app-bar app color="white" elevation="2" height="100">
      <v-btn icon @click="drawer = !drawer" color="black" aria-label="drawer">
        <v-icon> mdi-apps </v-icon>
      </v-btn>

      <v-spacer />

      <dashboard-header />
    </v-app-bar>

    <v-main class="pa-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardLayout",

  components: {
    DashboardHeader: () => import("../components/Header.vue"),
    Sidebar: () => import("../components/Sidebar.vue"),
  },

  data: () => ({ drawer: null }),

  computed: {
    // map getters
    ...mapGetters({
      systemDirection: "translate/systemDirection",
    }),
  },

  created() {
    // get notifications
    this.getNotifications();
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
      setNotificationsCount: "notifications/setNotificationsCount",
    }),

    // get notifications
    getNotifications() {
      this.axios
        .get(`notifications`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.setNotificationsCount(
            response.data.data.filter(
              (notification) => notification.read_at == null
            ).length
          );
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../style/dashboard.scss";
</style>
