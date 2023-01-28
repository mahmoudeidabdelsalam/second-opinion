<template>
  <section>
    <v-row>
      <v-col cols="12" xl="9" lg="9" md="9">
        <statistics />
      </v-col>
      <v-col cols="12" xl="3" lg="3" md="3">
        <current-user />
      </v-col>

      <v-col cols="12" xl="3" lg="3" md="3" sm="6">
        <patient-gender style="height: 100%" />
      </v-col>
      <v-col cols="12" xl="3" lg="3" md="3" sm="6">
        <reservations-type style="height: 100%" />
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6">
        <reservations-chart style="height: 100%" />
      </v-col>
      <v-col cols="12" xl="3" lg="4" md="6">
        <income-chart style="height: 100%" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <top-doctors />
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
    ReservationsChart: () =>
      import("../components/overview/ReservationsChart.vue"),
    IncomeChart: () => import("../components/overview/IncomeChart.vue"),
    TopDoctors: () => import("../components/overview/TopDoctors.vue"),
  },
};
</script>

<style></style>
