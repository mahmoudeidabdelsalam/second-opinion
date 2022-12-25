<template>
  <aside class="sidebar primary">
    <v-list>
      <v-list-item link to="/" active-class="white active" class="white--text">
        <v-list-item-icon>
          <v-icon color="white">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'ClientNotifications' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-bell-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Notifications</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'ClientAppointments' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Appointments</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'ClientMedicalReports' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-file-document</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Medical reports</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'ClientPaymentMethods' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-credit-card-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Payment</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'ClientSettings' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'ClientHelp' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-help-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'ClientAboutSite' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>About second opinion</v-list-item-title>
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
