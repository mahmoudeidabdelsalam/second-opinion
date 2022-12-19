<template>
  <aside class="sidebar white">
    <router-link :to="{ name: 'Home' }" class="brand d-block text-center">
      <img src="../../../assets/images/logo.webp" alt="Top Doctors logo" />
    </router-link>

    <span class="d-block pa-5 font-weight-bold black--text">Menu</span>

    <v-list>
      <v-list-item
        link
        :to="{ name: 'DashboardOverview' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="scss" scoped>
@import "../style/sidebar.scss";
</style>
