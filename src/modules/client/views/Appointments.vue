<template>
  <main class="appointments pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الحجوزات
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <div class="upcoming mb-10">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد القادمة
        </span>
        <v-row v-if="!waitingForData && upcoming.length > 0">
          <v-col
            cols="12"
            md="6"
            v-for="appointment in upcoming"
            :key="appointment.id"
          >
            <div class="appointment rounded-lg overflow-hidden">
              <div class="head primary_dark pa-3">
                <div class="mb-2">
                  <v-icon color="white"> mdi-calendar </v-icon>
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
              </div>
              <div class="body primary py-5 px-3">
                <div class="top d-flex justify-space-between align-start">
                  <div class="doctor d-flex justify-start align-center mb-4">
                    <v-avatar class="mx-2 rounded-lg" size="91">
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
                        class="d-block mb-2 font-weight-regular body-2 white--text text-truncate"
                      >
                        {{ appointment.doctor.title }}
                      </span>
                    </div>
                  </div>

                  <span
                    class="white rounded-lg pa-3 primary--text font-weight-bold text-h6"
                  >
                    zoom
                  </span>
                </div>
                <v-btn
                  block
                  class="white primary--text py-6 rounded-lg font-weight-bold"
                >
                  اعادة جدولة
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- waiting for data -->
        <v-skeleton-loader
          v-if="waitingForData && upcoming.length == 0"
          max-width="300"
          type="card"
        ></v-skeleton-loader>

        <!-- no data -->
        <div
          v-if="!waitingForData && upcoming.length == 0"
          class="d-flex flex-column align-center justify-center"
        >
          <v-avatar class="mb-5" size="120">
            <v-img
              :src="require('@/assets/images/pen-no-data.webp')"
              :lazy-src="require('@/assets/images/pen-no-data.webp')"
              cover
            ></v-img>
          </v-avatar>
          <span class="d-block mb-5 font-weight-bold primary--text">
            ليس لديك مواعيد حتى الان
          </span>
          <v-btn
            class="px-10"
            color="primary"
            depressed
            link
            :to="{ name: 'PublicDoctors' }"
          >
            ابحث عن طبيب
          </v-btn>
        </div>
      </div>

      <div class="expired mb-10">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد المنتهية
        </span>

        <v-row v-if="!waitingForData && expired.length > 0">
          <v-col
            cols="12"
            md="6"
            v-for="appointment in expired"
            :key="appointment.id"
          >
            <div class="appointment rounded-lg overflow-hidden">
              <div class="head grey_dark pa-3">
                <div class="m mb-2">
                  <v-icon color="white"> mdi-calendar </v-icon>
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
              </div>
              <div class="body grey py-5 px-3">
                <div class="doctor d-flex justify-start align-center mb-4">
                  <v-avatar class="mx-2 rounded-lg" size="91">
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
                <v-btn
                  block
                  class="white primary--text py-6 rounded-lg font-weight-bold"
                >
                  تقييم الخدمة
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- waiting for data -->
        <v-skeleton-loader
          v-if="waitingForData && expired.length == 0"
          max-width="300"
          type="card"
        ></v-skeleton-loader>

        <!-- no data -->
        <div
          v-if="!waitingForData && expired.length == 0"
          class="d-flex flex-column align-center justify-center"
        >
          <v-avatar class="mb-5" size="120">
            <v-img
              :src="require('@/assets/images/pen-no-data.webp')"
              :lazy-src="require('@/assets/images/pen-no-data.webp')"
              cover
            ></v-img>
          </v-avatar>
          <span class="d-block font-weight-bold primary--text">
            ليس لديك مواعيد منتهية
          </span>
        </div>
      </div>

      <div class="cancelled mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد الملغية
        </span>

        <v-row v-if="!waitingForData && canceled.length > 0">
          <v-col
            cols="12"
            md="6"
            v-for="appointment in canceled"
            :key="appointment.id"
          >
            <div class="appointment rounded-lg overflow-hidden">
              <div class="head red_dark pa-3">
                <div class="m mb-2">
                  <v-icon color="white"> mdi-calendar </v-icon>
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
              </div>
              <div class="body red py-5 px-3">
                <div class="doctor d-flex justify-start align-center">
                  <v-avatar class="mx-2 rounded-lg" size="91">
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
          v-if="waitingForData && canceled.length == 0"
          max-width="300"
          type="card"
        ></v-skeleton-loader>

        <!-- no data -->
        <div
          v-if="!waitingForData && canceled.length == 0"
          class="d-flex flex-column align-center justify-center"
        >
          <v-avatar class="mb-5" size="120">
            <v-img
              :src="require('@/assets/images/pen-no-data.webp')"
              :lazy-src="require('@/assets/images/pen-no-data.webp')"
              cover
            ></v-img>
          </v-avatar>
          <span class="d-block font-weight-bold primary--text">
            ليس لديك مواعيد ملغية
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Appointments",

  data: () => ({
    // waiting for data
    waitingForData: false,

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
      this.waitingForData = true;
      // get appointments
      this.getData(`patient/reservations?type=1`).then((res) => {
        // upcoming
        this.upcoming = res.filter((item) => item.status.value == 0);
        // expired
        this.expired = res.filter((item) => item.status.value == 3);
        // canceled
        this.canceled = res.filter((item) => item.status.value == 2);

        this.waitingForData = false;
      });
    },
  },
};
</script>
