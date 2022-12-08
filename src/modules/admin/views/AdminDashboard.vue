<template>
  <v-app class="admin-dashboard secondary_bg">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="secondary_bg"
      :right="systemDirection === 'rtl'"
    >
      <!-- sidebar -->
      <sidebar />
    </v-navigation-drawer>

    <v-app-bar app color="secondary_bg" elevation="2" elevate-on-scroll>
      <v-btn icon @click="drawer = !drawer" color="black" aria-label="drawer">
        <v-icon> mdi-apps </v-icon>
      </v-btn>

      <v-spacer />

      <admin-header />
    </v-app-bar>

    <v-main class="pa-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import mapGetters from vuex
import { mapGetters } from "vuex";
export default {
  name: "AdminDashboard",
  components: {
    AdminHeader: () => import("../components/Header.vue"),
    Sidebar: () => import("../components/Sidebar.vue"),
  },
  data: () => ({ drawer: null }),
  computed: {
    // map getters
    ...mapGetters({
      systemDirection: "translations/systemDirection",
    }),
  },
};
</script>

<style lang="scss">
@import "../style/admin-dashboard.scss";
</style>
