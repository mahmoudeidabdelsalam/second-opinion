<template>
  <section>
    <v-row>
      <v-col cols="12" md="9">
        <statistics />
      </v-col>
      <v-col cols="12" md="3">
        <current-user />
      </v-col>

      <v-col cols="12" md="3">
        <patient-gender style="height: 100%" />
      </v-col>
      <v-col cols="12" md="3">
        <reservations-type style="height: 100%" />
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6">
        <income-chart style="height: 100%" />
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
    PatientGender: () => import("../components/overview/PatientGender.vue"),
    ReservationsType: () =>
      import("../components/overview/ReservationsType.vue"),
    IncomeChart: () => import("../components/overview/IncomeChart.vue"),
  },
};
</script>

<style></style>
