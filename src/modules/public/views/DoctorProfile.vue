<template>
  <main class="doctor-profile py-10">
    <v-container style="max-width: 1400px" v-if="doctor">
      <div
        class="doctor-card primary pa-5 mb-5 rounded-lg d-flex flex-column flex-md-row justify-start align-start"
      >
        <v-avatar class="rounded-lg mb-5" size="150">
          <v-img
            :src="doctor.profile"
            :lazy-src="doctor.profile"
            cover
            max-height="150"
            max-width="150"
            alt="article"
          ></v-img>
        </v-avatar>

        <div class="doctor-info mx-0 mx-md-4">
          <span class="d-block mb-2 white--text font-weight-bold text-h6">
            {{ doctor.title }}
          </span>
          <span class="d-block mb-3 white--text font-weight-bold text-h6">
            {{ doctor.full_name }}
          </span>
          <div class="tags d-flex justify-start align-start flex-wrap">
            <span
              class="pa-2 px-3 mx-1 mb-1 primary_bg primary--text rounded-lg text-capitalize"
            >
              {{ doctor.department.name }}
            </span>
          </div>
        </div>
      </div>

      <v-row>
        <v-col cols="12" md="8">
          <div class="about-doctor white rounded-lg elevation-3 pa-5 mb-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-information-outline</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                عن الطبيب
              </span>
            </div>
            <p class="font-weight-light font-weight-bold secondary--text">
              {{ doctor.description }}
            </p>
          </div>

          <div class="about-doctor white rounded-lg elevation-3 pa-5 mb-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-certificate</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                الشهادات
              </span>
            </div>
            <p
              class="font-weight-light font-weight-bold secondary--text"
              v-for="item in 3"
              :key="item"
            >
              {{ doctor.educations }}
            </p>
          </div>

          <div class="about-doctor white rounded-lg elevation-3 pa-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-currency-usd</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                الاسعار
              </span>
            </div>
            <p class="font-weight-light font-weight-bold secondary--text">
              <span class="primary--text">الاستشارة: </span>
              {{ doctor.session_price }} ريال
            </p>
            <p class="font-weight-light font-weight-bold secondary--text">
              <span class="primary--text">التقرير الطبى: </span>
              {{ doctor.consultation_price }} ريال
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="px-5">
            <div class="head mb-3">
              <span
                class="d-block mb-5 font-weight-bold secondary--text text-h6"
              >
                احجز موعدك
              </span>
            </div>
            <v-btn
              class="head primary white--text pa-7 mb-3 d-flex justify-start align-center rounded-lg"
              block
              @click.prevent="showDatePicker = !showDatePicker"
            >
              <v-icon class="white pa-1 rounded-lg" color="primary">
                mdi-video
              </v-icon>
              <span class="mx-2 font-weight-bold text-capitalize">
                حجز استشارة صوتية/مرئية
              </span>
            </v-btn>

            <v-form
              ref="form"
              :v-model="valid"
              lazy-validation
              class="mb-10"
              v-if="showDatePicker"
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
                  @input="getAvailablTimes"
                ></v-date-picker>
              </v-menu>

              <!-- radio buttons -->
              <v-radio-group v-model="column" column>
                <v-radio label="Option 1" value="radio-1"></v-radio>
                <v-radio label="Option 2" value="radio-2"></v-radio>
              </v-radio-group>
              <hr />
              <v-radio-group v-model="row" row>
                <v-radio label="Option 1" value="radio-1"></v-radio>
                <v-radio label="Option 2" value="radio-2"></v-radio>
              </v-radio-group>

              <v-radio-group
                v-model="reservation_time"
                row
                class="mt-5"
                required
                outlined
                dense
              >
                <v-radio
                  v-for="item in available_times"
                  :key="item"
                  :label="item"
                  :value="item"
                ></v-radio>
              </v-radio-group>

              <v-btn color="primary" depressed>احجز موعد</v-btn>
            </v-form>

            <v-btn
              class="head primary white--text pa-7 mb-3 d-flex justify-start align-center rounded-lg"
              block
            >
              <v-icon class="white pa-1 rounded-lg" color="primary">
                mdi-file-multiple
              </v-icon>
              <span class="mx-2 font-weight-bold text-capitalize">
                طلب استشارة مكتوبة
              </span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- waiting for data -->
    <v-container style="max-width: 1400px" v-else>
      <v-skeleton-loader max-width="300" type="card"></v-skeleton-loader>
    </v-container>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DoctorProfile",

  data: () => ({
    // fotm validation
    valid: true,
    // doctor
    doctor: null,
    // date picker
    menu: false,
    // show date picker
    showDatePicker: false,
    // reservation day
    reservation_day: null,
    // availabl times
    availabl_times: null,
  }),

  created() {
    // init data
    this.initData();
  },

  ...mapGetters({
    valid: "validationRules/valid",
  }),

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
      addData: "crudOperations/addData",
    }),

    // init data
    initData() {
      // get doctors
      this.getData(`patient/doctors/${this.$route.params.id}`).then((res) => {
        this.doctor = res;
      });
    },

    // get availabl times
    getAvailablTimes() {
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("doctor_id", this.$route.params.id);
        data.append("reservation_day", this.reservation_day);

        this.addData({
          url: "patient/reservations/get-available-dates",
          data: data,
        }).then((res) => {
          this.availabl_times = res;
        });
      }
    },
  },
};
</script>

<style></style>
