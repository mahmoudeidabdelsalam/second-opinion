<template>
  <section>
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
      v-if="waitingForData && expired.length"
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
  </section>
</template>

<script>
export default {
  name: "Expired",

  props: {
    expired: {
      type: Array,
      default: () => null,
    },

    waitingForData: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    // changeAppointmentTimeDialog
    changeAppointmentTimeDialog: false,

    // date picker
    menu: false,

    // reservation day
    reservation_day: null,
    // availabl times
    available_times: [],
    // reservation time
    reservation_time: null,
    // row radio group
    rowRadio: null,

    // loading results
    loading_resutls: false,

    // min date
    minDate: new Date().toISOString().substr(0, 10),
  }),
};
</script>

<style></style>
