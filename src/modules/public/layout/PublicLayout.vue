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

    <v-app-bar app color="white" elevation="2" height="100">
      <v-btn
        icon
        @click="drawer = !drawer"
        color="black"
        aria-label="drawer"
        class="hidden-lg-and-up"
      >
        <v-icon> mdi-apps </v-icon>
      </v-btn>

      <public-header />
    </v-app-bar>

    <v-main class="pa-0">
      <router-view />
    </v-main>

    <public-footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PublicLayout",

  components: {
    PublicHeader: () => import("../components/Header.vue"),
    Sidebar: () => import("../components/Sidebar.vue"),
    PublicFooter: () => import("../components/Footer.vue"),
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
