<template>
  <section>
    <v-row v-if="!waitingForData && upcoming.length > 0">
      <v-col
        cols="12"
        md="6"
        v-for="(appointment, index) in upcoming"
        :key="index"
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

            <v-dialog
              v-model="changeTimeDialogs[index]"
              persistent
              transition="dialog-top-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  block
                  class="white primary--text py-6 rounded-lg font-weight-bold"
                >
                  اعادة جدولة
                </v-btn>
              </template>
              <v-card>
                <v-toolbar class="text-h6" elevation="0">
                  <v-icon color="primary">mdi-calendar</v-icon>
                  <span class="mx-4">المواعيد المتاحة</span>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="closeDialog(index)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <v-menu
                    v-model="menus[index]"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="reservation_day"
                        :min="minDate"
                        label="اختر اليوم"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        clearable
                        required
                        outlined
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="reservation_day"
                      :min="minDate"
                      @change="getAvailablTimes(appointment.doctor.id)"
                      @input="menus[index] = false"
                    ></v-date-picker>
                  </v-menu>

                  <!-- loading -->
                  <v-progress-linear
                    v-if="loading_resutls"
                    indeterminate
                    color="primary"
                    class="mb-5"
                  ></v-progress-linear>

                  <!-- no available times -->
                  <v-alert v-if="notAvailableMessage" type="error" class="mb-5">
                    {{ notAvailableMessage }}
                  </v-alert>

                  <v-radio-group
                    v-model="reservation_time"
                    row
                    v-if="available_times.length"
                    class="font-weight-bold"
                  >
                    <v-radio
                      v-for="item in available_times"
                      :key="item"
                      :label="item"
                      :value="item"
                      class="mb-2"
                    ></v-radio>
                  </v-radio-group>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    block
                    class="primary py-6 rounded-lg"
                    @click="changeTime(appointment.id, index)"
                  >
                    تاكيد الحجز
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Upcoming",

  props: {
    upcoming: {
      type: Array,
      default: () => [],
    },

    waitingForData: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    // changeTimeDialogs
    changeTimeDialogs: [],

    // date picker
    menus: [],

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

    // not available message
    notAvailableMessage: null,
  }),

  mounted() {
    this.changeTimeDialogs.forEach((dialog, index) => {
      this.changeTimeDialogs[index] = false;
    });

    this.menus.forEach((menu, index) => {
      this.menus[index] = false;
    });
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // get available times
    getAvailablTimes(doctor_id) {
      this.loading_resutls = true;
      this.available_times = [];

      let data = new FormData();
      data.append("doctor_id", doctor_id);
      data.append("reservation_day", this.reservation_day);

      this.axios
        .post(`patient/reservations/get-available-dates`, data)
        .then((response) => {
          this.loading_resutls = false;
          this.notAvailableMessage = null;
          response.data.data
            ? (this.available_times = response.data.data)
            : ((this.available_times = []), this.$refs.form.reset());
        })
        .catch((error) => {
          this.loading_resutls = false;
          this.notAvailableMessage = error.response.data.message;
          this.available_times = [];
        });
    },

    // change appointment time
    changeTime(appointment_id, index) {
      if (this.reservation_day) {
        let data = new FormData();
        data.append("reservation_day", this.reservation_day);
        data.append("reservation_time_start", this.reservation_time);
        data.append("_method", "PUT");

        this.axios
          .post(`patient/reservations/${appointment_id}`, data, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            this.handleResponse(response);
            this.available_times = [];
            this.changeTimeDialogs[index] = false;
            this.reservation_day = "";
            // emit event
            this.$emit("assignNewData", response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.notAvailableMessage = "يجب اختيار تاريخ الحجز";
      }
    },

    // close change time dialog
    closeDialog(index) {
      this.changeTimeDialogs[index] = false;
      this.available_times = [];
      this.notAvailableMessage = null;
      this.reservation_day = "";
    },
  },
};
</script>

<style></style>
