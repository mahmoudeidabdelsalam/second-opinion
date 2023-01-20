<template>
  <aside class="sidebar primary">
    <router-link
      :to="{ name: 'Home' }"
      class="brand d-block pa-5 text-center white"
      style="height: 100px"
    >
      <img src="../../../assets/images/logo.webp" alt="Top Doctors logo" />
    </router-link>

    <div class="user-data d-flex flex-column align-center pa-5">
      <span class="d-block font-weight-bold white--text">
        {{ user.full_name }}
      </span>
      <span class="d-block mb-3 font-weight-light white--text">
        {{ user.phone_number }}
      </span>
    </div>

    <v-list>
      <v-list-item link to="/" active-class="white active" class="white--text">
        <v-list-item-icon>
          <v-icon color="white">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            الرئيسية
          </v-list-item-title>
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
          <v-list-item-title class="font-weight-bold">
            الاشعارات
          </v-list-item-title>
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
          <v-list-item-title class="font-weight-bold">
            حجوزاتى
          </v-list-item-title>
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
          <v-list-item-title class="font-weight-bold">
            الاستشارات المكتوبة
          </v-list-item-title>
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
          <v-list-item-title class="font-weight-bold">الدفع</v-list-item-title>
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
          <v-list-item-title class="font-weight-bold">
            الاعدادات
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item
        link
        :to="{ name: 'ClientHelp' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-help-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            المساعدة
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- <v-list-item
        link
        :to="{ name: 'ClientAboutSite' }"
        active-class="white active"
        class="white--text"
      >
        <v-list-item-icon>
          <v-icon color="white">mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            عن الموقع
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-list>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",

  computed: {
    ...mapGetters({
      user: "user/userData",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../style/sidebar.scss";
</style>
