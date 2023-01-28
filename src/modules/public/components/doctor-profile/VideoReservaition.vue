<template>
  <section>
    <v-btn
      class="head primary white--text pa-7 mb-3 d-flex justify-start align-center rounded-lg"
      block
      @click.prevent="showDatePicker = !showDatePicker"
    >
      <v-icon class="white pa-1 rounded-lg" color="primary"> mdi-video </v-icon>
      <span class="mx-2 font-weight-bold text-capitalize">
        حجز استشارة صوتية/مرئية
      </span>
    </v-btn>

    <v-form ref="form" v-model="valid" class="mb-10" v-if="showDatePicker">
      <v-menu
        v-model="menu"
        :close-on-content-click="true"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="reservation_day"
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
          :max="maxDate"
          @change="getAvailablTimes"
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

      <v-btn color="primary" depressed @click="bookVideoAppointment">
        ادفع لتاكيد الحجز
      </v-btn>
    </v-form>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "VideoReservaition",

  data: () => ({
    valid: true,
    showDatePicker: false,
    menu: false,
    reservation_day: "",
    reservation_time: "",
    available_times: [],
    notAvailableMessage: null,
    loading_resutls: false,
    // min date
    minDate: new Date().toISOString().substr(0, 10),

    // max date 7 days
    maxDate: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .substr(0, 10),
  }),

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // get available times
    getAvailablTimes() {
      if (this.$refs.form.validate()) {
        this.loading_resutls = true;

        let data = new FormData();
        data.append("doctor_id", this.$route.params.id);
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
      }
    },

    bookVideoAppointment() {
      if (this.reservation_time) {
        let data = new FormData();
        data.append("doctor_id", this.$route.params.id);
        data.append("reservation_day", this.reservation_day);
        data.append("reservation_time_start", this.reservation_time);
        data.append("notes", "Video/audio Appointment");
        data.append("type", 1);
        data.append("is_web", 1);

        this.axios
          .post(`patient/reservations-two`, data, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            // redirect to ClientNotifications page
            this.$router.push({
              name: "ClientNotifications",
            });
            // open payment url
            window.open(response.data.data.invoice.payment_url, "_blank");
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });
      }
    },
  },
};
</script>

<style></style>
