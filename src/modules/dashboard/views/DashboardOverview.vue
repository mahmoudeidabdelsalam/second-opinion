<template>
  <section>
    <v-container fluid v-if="!waitingForData">
      <v-row>
        <v-col cols="12" xl="9" lg="10" md="9">
          <statistics
            :departments="dashboardData.departments"
            :users="dashboardData.users"
            :doctors="dashboardData.doctors"
            :assistants="dashboardData.assistants"
            :roles="dashboardData.roles"
            :patients="dashboardData.patients"
            :reservations="dashboardData.reservations"
          />
        </v-col>
        <v-col cols="12" xl="3" lg="2" md="3">
          <current-user />
        </v-col>

        <v-col cols="12" xl="3" lg="3" md="3" sm="6">
          <patient-gender
            :patients="dashboardData.patients"
            style="height: 100%"
          />
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="6">
          <reservations-type
            :reservations="dashboardData.reservations"
            style="height: 100%"
          />
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="6">
          <reservations-chart style="height: 100%" />
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="6">
          <income-chart style="height: 100%" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <top-doctors :doctors="dashboardData.best_doctors" />
        </v-col>
      </v-row>
    </v-container>

    <component-loading v-else />
  </section>
</template>

<script>
import { mapActions } from "vuex";

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

    // loading
    ComponentLoading: () =>
      import("@/modules/loading/components/ComponentLoading.vue"),
  },

  data: () => ({
    // waiting for data
    waitingForData: false,

    //dashboard data
    dashboardData: {},
  }),

  created() {
    this.getDashboardData();
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // get dashboard data
    getDashboardData() {
      // waiting for data
      this.waitingForData = true;

      this.axios
        .get(`dashboard/statistics`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.dashboardData = response.data.data;

          // hide loading
          this.waitingForData = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);

          // hide loading
          this.waitingForData = false;
        });
    },
  },
};
</script>

<style></style>
