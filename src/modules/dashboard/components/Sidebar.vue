<template>
  <aside class="sidebar white">
    <router-link :to="{ name: 'Home' }" class="brand d-block pa-5 text-center">
      <img src="../../../assets/images/logo.webp" alt="Top Doctors logo" />
    </router-link>

    <span class="d-block pa-5 font-weight-medium black--text">القائمة</span>

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
          <v-list-item-title class="font-weight-medium">
            لوحة التحكم
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'DoctorProfile', params: { id: user.id } }"
        active-class="primary--text"
        v-if="user.role.name === 'doctor'"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-box</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            الصفحة الشخصية
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'DoctorNotifications' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon> mdi-bell </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            الاشعارات
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'Departments' }"
        active-class="primary--text"
        v-if="user.role.name === 'admin'"
      >
        <v-list-item-icon>
          <v-icon>mdi-handshake</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            الاقسام
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'Employees' }"
        active-class="primary--text"
        v-if="user.role.name === 'admin'"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            الموظفين
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'Doctors' }"
        active-class="primary--text"
        v-if="user.role.name === 'admin'"
      >
        <v-list-item-icon>
          <v-icon>mdi-doctor</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            الاطباء
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'Assistants' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-clipboard-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            المساعدين
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'Roles' }"
        active-class="primary--text"
        v-if="user.role.name === 'admin'"
      >
        <v-list-item-icon>
          <v-icon>mdi-shield</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            الصلاحيات
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Patients' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            المرضى
          </v-list-item-title>
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
          <v-list-item-title class="font-weight-medium">
            الحجوزات
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
      permissions: "user/permissions",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../style/sidebar.scss";
</style>
