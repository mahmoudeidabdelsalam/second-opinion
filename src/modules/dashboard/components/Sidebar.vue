<template>
  <aside class="sidebar white">
    <router-link :to="{ name: 'Home' }" class="brand d-block pa-5 text-center">
      <img src="../../../assets/images/logo.webp" alt="Top Doctors logo" />
    </router-link>

    <span class="d-block pa-5 font-weight-bold black--text">القائمة</span>

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
          <v-list-item-title class="font-weight-bold"
            >لوحة التحكم</v-list-item-title
          >
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
          <v-list-item-title class="font-weight-bold">
            الاقسام
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item link :to="{ name: 'Services' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-playlist-check</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            الخدمات
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item
        link
        :to="{ name: 'Employees' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            الموظفين
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Doctors' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-doctor</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
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
          <v-list-item-title class="font-weight-bold">
            المساعدين
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Roles' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-shield</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            الصلاحيات
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Patients' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
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
          <v-list-item-title class="font-weight-bold">
            الحجوزات
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item
        link
        :to="{ name: 'DoctorsExperiences' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-expand-all</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            خبرة الاطباء
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- <v-list-item
        link
        :to="{ name: 'DoctorsEducations' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-school</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            شهادات الاطباء
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- <v-list-item link :to="{ name: 'Invoices' }" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-receipt</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            الفواتير
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
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
