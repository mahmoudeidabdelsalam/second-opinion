<template>
  <v-app class="public">
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      class="secondary_bg"
      :right="systemDirection === 'rtl'"
    >
      <!-- sidebar -->
      <sidebar />
    </v-navigation-drawer>

    <v-app-bar app color="secondary_bg" elevation="2" elevate-on-scroll>
      <v-btn
        icon
        @click="drawer = !drawer"
        color="black"
        aria-label="drawer"
        class="d-md-none d-inline"
      >
        <v-icon> mdi-apps </v-icon>
      </v-btn>

      <v-spacer />

      <public-header />
    </v-app-bar>

    <v-main class="pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PublicLayout",

  components: {
    PublicHeader: () => import("../components/Header.vue"),
    Sidebar: () => import("../components/Sidebar.vue"),
  },

  data: () => ({ drawer: null }),

  computed: {
    // map getters
    ...mapGetters({
      systemDirection: "translate/systemDirection",
    }),
  },
};
</script>

<style lang="scss">
@import "../style/public.scss";
</style>
