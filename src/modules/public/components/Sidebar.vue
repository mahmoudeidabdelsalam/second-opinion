<template>
  <aside class="sidebar white">
    <router-link
      :to="{ name: 'Home' }"
      class="brand d-flex justify-center align-center pa-5 font-weight-bold primary--text text-h6 text-center"
    >
      <img src="@/assets/images/logo.webp" alt="Top Doctors logo" />
      <span class="mx-2">Top Doctors</span>
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

      <v-list-item
        link
        :to="{ name: 'Departments' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-handshake</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Departments</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Services' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-playlist-check</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Services</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'Employees' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Employees</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Doctors' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-doctor</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Doctors</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Roles' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-shield</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Roles</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Patients' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Patients</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'Reservations' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-timetable</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Reservations</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'DoctorsExperiences' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-expand-all</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Doctors experiences</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'DoctorsEducations' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-school</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Doctors educations</v-list-item-title>
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
