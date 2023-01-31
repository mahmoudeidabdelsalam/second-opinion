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
      <span
        class="d-block font-weight-medium white--text text-h5"
        v-if="user && user.full_name"
      >
        {{ user.full_name }}
      </span>
      <span
        class="d-block mb-3 font-weight-light white--text"
        v-if="user && user.phone_number"
      >
        {{ user.phone_number }}
      </span>
    </div>

    <div class="d-flex flex-column justify-space-between pr-5">
      <v-list>
        <v-list-item
          link
          to="/"
          active-class="white active"
          class="white--text"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1 font-weight-medium">
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
            <v-list-item-title class="text-subtitle-1 font-weight-medium">
              الاشعارات
              <span
                v-if="notificationsCount && notificationsCount > 0"
                class="py-1 px-2 mr-3 d-inline-block primary_bg primary--text body-2"
                style="border-radius: 2000px"
              >
                {{ notificationsCount }}
              </span>
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
            <v-list-item-title class="text-subtitle-1 font-weight-medium">
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
            <v-list-item-title class="text-subtitle-1 font-weight-medium">
              الاستشارات المكتوبة
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item
          link
          :to="{ name: 'ClientPaymentMethods' }"
          active-class="white active"
          class="white--text"
        >
          <v-list-item-icon>
            <v-icon color="white">mdi-credit-card-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-subtitle-1 font-weight-medium"
              >الدفع</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item> -->

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
            <v-list-item-title class="text-subtitle-1 font-weight-medium">
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
          <v-list-item-title class="text-subtitle-1 font-weight-medium">
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
          <v-list-item-title class="text-subtitle-1 font-weight-medium">
            عن الموقع
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
      </v-list>

      <v-btn
        depressed
        @click="logout"
        class="white primary--text rounded-xl text-capitalize d-flex justify-start align-center pa-6 mx-4 mt-16"
      >
        <v-icon class="primary--text">mdi-logout</v-icon>
        <span class="mx-2">تسجيل الخروج</span>
      </v-btn>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Sidebar",

  computed: {
    ...mapGetters({
      user: "user/userData",
      notificationsCount: "notifications/notificationsCount",
    }),
  },

  created() {
    // get notifications
    this.getNotifications();
  },

  methods: {
    // map translate action
    ...mapActions({
      // logout
      logoutAction: "logout/logout",

      handleResponse: "responseHandler/handleResponse",

      setNotificationsCount: "notifications/setNotificationsCount",
    }),

    // logout method
    logout() {
      // call loogut action
      this.logoutAction();
    },

    // get notifications
    getNotifications() {
      this.axios
        .get(`notifications`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.setNotificationsCount(
            response.data.data.filter(
              (notification) => notification.read_at == null
            ).length
          );
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/sidebar.scss";
</style>
