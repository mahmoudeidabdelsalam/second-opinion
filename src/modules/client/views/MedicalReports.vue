<template>
  <main class="medical-reports pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      التقارير
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <div class="upcoming mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          التقارير المرسلة
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
                class="head primary_dark d-flex flex-column flex-sm-row justify-sm-space-between justify-start align-start pa-3"
              >
                <div class="m mb-2">
                  <v-icon color="white"> mdi-calendar </v-icon>
                  <span class="white--text">
                    <!-- {{
                      appointment.reservation_date.day.label +
                      " الموافق " +
                      appointment.reservation_date.day.value +
                      " / " +
                      appointment.reservation_date.month +
                      " - الساعة: " +
                      appointment.reservation_date.time
                    }} -->
                    الاثنين الموافق 13/ 10 - الساعة: 01:30 مساءًا
                  </span>
                </div>
                <v-icon color="white" v-if="appointment.type.value == 1">
                  mdi-video
                </v-icon>
              </div>
              <div class="body primary pa-5">
                <span class="d-block mb-2 font-weight-bold white--text">
                  تم طلب تقرير طبي عن حالة مرضية
                </span>
                <span
                  class="d-block mb-5 font-weight-regular body-2 white--text"
                >
                  د/ ندى أحمد - تخصص باطنة
                </span>
                <v-btn class="white primary--text font-weight-bold" depressed>
                  مشاهدة الملفات المرفقة
                </v-btn>
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
          التقارير المستلمة
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
                  <v-icon color="white"> mdi-calendar </v-icon>
                  <span class="white--text">
                    <!-- {{
                      appointment.reservation_date.day.label +
                      " الموافق " +
                      appointment.reservation_date.day.value +
                      " / " +
                      appointment.reservation_date.month +
                      " - الساعة: " +
                      appointment.reservation_date.time
                    }} -->
                    الاثنين الموافق 13/ 10 - الساعة: 01:30 مساءًا
                  </span>
                </div>
                <v-icon color="white" v-if="appointment.type.value == 1">
                  mdi-video
                </v-icon>
              </div>
              <div class="body grey pa-5">
                <span class="d-block mb-2 font-weight-bold white--text">
                  تم طلب تقرير طبي عن حالة مرضية
                </span>
                <span
                  class="d-block mb-5 font-weight-regular body-2 white--text"
                >
                  د/ ندى أحمد - تخصص باطنة
                </span>
                <v-btn class="white primary--text font-weight-bold" depressed>
                  مشاهدة التقرير
                </v-btn>
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
  name: "MedicalReports",

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
