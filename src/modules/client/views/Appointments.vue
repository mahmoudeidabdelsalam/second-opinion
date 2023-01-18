<template>
  <main class="appointments pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الحجوزات
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <div class="upcoming mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد القادمة
        </span>
        <v-row v-if="upcoming.length">
          <v-col
            cols="12"
            md="6"
            v-for="appointment in upcoming"
            :key="appointment.id"
          >
            <div class="appointment rounded-lg overflow-hidden">
              <div
                class="head primary_dark d-flex flex-column flex-sm-row justify-sm-space-between justify-start align-start pa-3"
              >
                <div class="m mb-2">
                  <v-icon color="white" v-if="appointment.type.value == 1">
                    mdi-calendar
                  </v-icon>
                  <span class="white--text" v-else>استشارة مكتوبة</span>
                  <span class="white--text" v-if="appointment.reservation_date">
                    {{
                      appointment.reservation_date.day.label +
                      " الموافق " +
                      appointment.reservation_date.day.value +
                      " / " +
                      appointment.reservation_date.month +
                      " - الساعة: " +
                      appointment.reservation_date.time
                    }}
                  </span>
                </div>
                <v-icon color="white" v-if="appointment.type.value == 1">
                  mdi-video
                </v-icon>
              </div>
              <div class="body primary py-5 px-3">
                <div class="doctor d-flex justify-start align-center">
                  <v-avatar class="mx-2 rounded-lg" size="90">
                    <v-img
                      :src="appointment.doctor.profile"
                      :lazy-src="appointment.doctor.profile"
                      cover
                      max-height="90"
                      max-width="90"
                      alt="doctor"
                    ></v-img>
                  </v-avatar>
                  <div class="doctor-info px-2">
                    <span class="d-block mb-2 font-weight-bold white--text">
                      {{ appointment.doctor.name }}
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      {{ appointment.doctor.title }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- waiting for data -->
        <v-skeleton-loader
          v-else
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </div>

      <div class="expired mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد المنتهية
        </span>

        <v-row v-if="expired.length">
          <v-col
            cols="12"
            md="6"
            v-for="appointment in expired"
            :key="appointment.id"
          >
            <div class="appointment rounded-lg overflow-hidden">
              <div
                class="head grey_dark d-flex flex-column flex-sm-row justify-sm-space-between justify-start align-start pa-3"
              >
                <div class="m mb-2">
                  <v-icon color="white" v-if="appointment.type.value == 1">
                    mdi-calendar
                  </v-icon>
                  <span class="white--text" v-else>استشارة مكتوبة</span>
                  <span class="white--text" v-if="appointment.reservation_date">
                    {{
                      appointment.reservation_date.day.label +
                      " الموافق " +
                      appointment.reservation_date.day.value +
                      " / " +
                      appointment.reservation_date.month +
                      " - الساعة: " +
                      appointment.reservation_date.time
                    }}
                  </span>
                </div>
                <v-icon color="white" v-if="appointment.type.value == 1">
                  mdi-video
                </v-icon>
              </div>
              <div class="body grey py-5 px-3">
                <div class="doctor d-flex justify-start align-center">
                  <v-avatar class="mx-2 rounded-lg" size="90">
                    <v-img
                      :src="appointment.doctor.profile"
                      :lazy-src="appointment.doctor.profile"
                      cover
                      max-height="90"
                      max-width="90"
                      alt="doctor"
                    ></v-img>
                  </v-avatar>
                  <div class="doctor-info px-2">
                    <span class="d-block mb-2 font-weight-bold white--text">
                      {{ appointment.doctor.name }}
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      {{ appointment.doctor.title }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- waiting for data -->
        <v-skeleton-loader
          v-else
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </div>

      <div class="cancelled mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد الملغية
        </span>

        <v-row v-if="canceled.length">
          <v-col
            cols="12"
            md="6"
            v-for="appointment in canceled"
            :key="appointment.id"
          >
            <div class="appointment rounded-lg overflow-hidden">
              <div
                class="head red_dark d-flex flex-column flex-sm-row justify-sm-space-between justify-start align-start pa-3"
              >
                <div class="m mb-2">
                  <v-icon color="white" v-if="appointment.type.value == 1">
                    mdi-calendar
                  </v-icon>
                  <span class="white--text" v-else>استشارة مكتوبة</span>
                  <span class="white--text" v-if="appointment.reservation_date">
                    {{
                      appointment.reservation_date.day.label +
                      " الموافق " +
                      appointment.reservation_date.day.value +
                      " / " +
                      appointment.reservation_date.month +
                      " - الساعة: " +
                      appointment.reservation_date.time
                    }}
                  </span>
                </div>
                <v-icon color="white" v-if="appointment.type.value == 1">
                  mdi-video
                </v-icon>
              </div>
              <div class="body red py-5 px-3">
                <div class="doctor d-flex justify-start align-center">
                  <v-avatar class="mx-2 rounded-lg" size="90">
                    <v-img
                      :src="appointment.doctor.profile"
                      :lazy-src="appointment.doctor.profile"
                      cover
                      max-height="90"
                      max-width="90"
                      alt="doctor"
                    ></v-img>
                  </v-avatar>
                  <div class="doctor-info px-2">
                    <span class="d-block mb-2 font-weight-bold white--text">
                      {{ appointment.doctor.name }}
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      {{ appointment.doctor.title }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- waiting for data -->
        <v-skeleton-loader
          v-else
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Appointments",

  data: () => ({
    // appointments
    // upcoming
    upcoming: [],
    // expired
    expired: [],
    // canceled
    canceled: [],
  }),

  created() {
    // init data
    this.initData();
  },

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
    }),

    // init data
    initData() {
      // get appointments
      this.getData(`patient/reservations`).then((res) => {
        // upcoming
        this.upcoming = res.filter((item) => item.status.value == 0);
        // expired
        this.expired = res.filter((item) => item.status.value == 3);
        // canceled
        this.canceled = res.filter((item) => item.status.value == 2);
      });
    },
  },
};
</script>
