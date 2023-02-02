<template>
  <section class="statistics" style="height: 100%">
    <v-row>
      <!-- Departments -->
      <v-col cols="12" xl="3" lg="3" md="4" sm="6">
        <router-link
          :to="{ name: 'Departments' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            mdi-handshake
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ departments }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              الاقسام
            </span>
          </div>
        </router-link>
      </v-col>

      <!-- Users -->
      <v-col cols="12" xl="3" lg="3" md="4" sm="6">
        <router-link
          :to="{ name: 'Employees' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            mdi-account-multiple
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ users }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              الموظفين
            </span>
          </div>
        </router-link>
      </v-col>

      <!-- Doctors -->
      <v-col cols="12" xl="3" lg="3" md="4" sm="6">
        <router-link
          :to="{ name: 'Doctors' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            mdi-doctor
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ doctors }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              الاطباء
            </span>
          </div>
        </router-link>
      </v-col>

      <!-- Assistants -->
      <v-col cols="12" xl="3" lg="3" md="4" sm="6">
        <router-link
          :to="{ name: 'Assistants' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            mdi-clipboard-account
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ assistants }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              المساعدين
            </span>
          </div>
        </router-link>
      </v-col>

      <!-- Roles -->
      <v-col cols="12" xl="3" lg="3" md="4" sm="6">
        <router-link
          :to="{ name: 'Roles' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            mdi-shield
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ roles }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              الصلاحيات
            </span>
          </div>
        </router-link>
      </v-col>

      <!-- Patients -->
      <v-col cols="12" xl="3" lg="3" md="4" sm="6">
        <router-link
          :to="{ name: 'Patients' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            mdi-account-group
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ patients.count }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              المرضى
            </span>
          </div>
        </router-link>
      </v-col>

      <!-- Video reservations -->
      <v-col cols="12" xl="3" lg="3" md="4" sm="6">
        <router-link
          :to="{ name: 'Reservations' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            mdi-video
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ reservations.call }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              الحجوزات المرئية
            </span>
          </div>
        </router-link>
      </v-col>

      <!-- Written reservations -->
      <v-col cols="12" xl="3" lg="3" md="4" sm="6">
        <router-link
          :to="{ name: 'Reservations' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            mdi-file
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ reservations.chat }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              الحجوزات الكتابية
            </span>
          </div>
        </router-link>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "Statistics",

  props: {
    departments: {
      type: Number,
      default: 0,
    },
    users: {
      type: Number,
      default: 0,
    },
    doctors: {
      type: Number,
      default: 0,
    },
    assistants: {
      type: Number,
      default: 0,
    },
    roles: {
      type: Number,
      default: 0,
    },
    patients: {
      type: Object,
      default: () => ({}),
    },
    reservations: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.statistics {
  .box {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    height: 100%;

    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      transform: translateY(-3px);
    }
  }
}
</style>
