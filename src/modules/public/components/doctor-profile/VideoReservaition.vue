<template>
  <section>
    <v-btn
      class="head primary white--text pa-7 mb-5 d-flex justify-start align-center rounded-lg"
      block
      @click.prevent="showDatePicker = !showDatePicker"
    >
      <v-icon class="white pa-1 rounded-lg" color="primary"> mdi-video </v-icon>
      <span class="mx-2 font-weight-bold text-capitalize">
        حجز استشارة صوتية/مرئية
      </span>
    </v-btn>

    <v-form
      ref="form"
      v-model="valid"
      class="mb-10"
      v-if="showDatePicker && authenticated"
    >
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
          scrollable
          @change="getAvailablTimes"
        ></v-date-picker>
      </v-menu>

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

      <v-btn
        :disabled="bookAppointment"
        color="primary"
        depressed
        @click="bookVideoAppointment"
      >
        ادفع لتاكيد الحجز
      </v-btn>
    </v-form>

    <v-alert v-if="showDatePicker && !authenticated" type="error">
      <span class="d-block mb-2">برجاء تسجيل الدخول لحجز استشارة</span>
      <v-btn color="primary" depressed link :to="{ name: 'Login' }">
        تسجيل الدخول
      </v-btn>
    </v-alert>

    <!-- redirect dialog after book appointment -->
    <v-dialog v-model="redirectDialog" persistent max-width="400">
      <v-card>
        <v-toolbar class="mb-5" elevation="0">
          <v-toolbar-title>الذهاب لصفحة الحجوزات</v-toolbar-title>
        </v-toolbar>
        <v-card-actions>
          <v-btn
            class="primary py-6"
            depressed
            link
            :to="{ name: 'ClientAppointments' }"
          >
            الذهاب لصفحة الحجوزات
          </v-btn>

          <v-btn class="primary py-6" depressed @click="redirectDialog = false">
            البقاء فى الصفحة
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    // min date
    minDate: new Date().toISOString().substr(0, 10),

    // max date 7 days
    maxDate: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .substr(0, 10),

    bookAppointment: false,

    // redirect dialog
    redirectDialog: false,
  }),

  computed: {
    ...mapGetters({
      authenticated: "user/authenticated",
    }),
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
      showRequsetLoading: "loading/showRequestLoading",
      hideRequsetLoading: "loading/hideRequestLoading",
    }),

    // get available times
    getAvailablTimes() {
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("doctor_id", this.$route.params.id);
        data.append("reservation_day", this.reservation_day);

        // show request loading
        this.showRequsetLoading();

        this.bookAppointment = false;

        this.axios
          .post(`patient/reservations/get-available-dates`, data)
          .then((response) => {
            this.notAvailableMessage = null;
            response.data.data
              ? (this.available_times = response.data.data)
              : ((this.available_times = []), this.$refs.form.reset());

            // hide request loading
            this.hideRequsetLoading();
          })
          .catch((error) => {
            this.notAvailableMessage = error.response.data.message;
            this.available_times = [];

            // hide request loading
            this.hideRequsetLoading();
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

        this.bookAppointment = true;

        // show request loading
        this.showRequsetLoading();

        this.axios
          .post(`patient/reservations-two`, data, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            // open payment url
            window.open(response.data.data.invoice.payment_url, "_blank");

            // hide request loading
            this.hideRequsetLoading();

            // reset form
            this.$refs.form.reset();

            // empty available times
            this.available_times = [];

            // hise date picker
            this.showDatePicker = false;

            // open redirect dialog
            this.redirectDialog = true;
          })
          .catch((error) => {
            this.bookAppointment = false;

            this.handleResponse(error.response);

            // hide request loading
            this.hideRequsetLoading();
          });
      }
    },
  },
};
</script>

<style></style>
