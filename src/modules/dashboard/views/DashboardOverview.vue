<template>
  <section>
    <v-row>
      <v-col cols="12" md="9">
        <statistics />
      </v-col>
      <v-col cols="12" md="3">
        <current-user />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "DashboardOverview",

  components: {
    Statistics: () => import("../components/overview/Statistics.vue"),
    CurrentUser: () => import("../components/overview/CurrentUser.vue"),
  },
};
</script>

<style></style>
