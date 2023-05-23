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
          <span class="d-block mb-2 white--text font-weight-bold">
            {{ doctor.title }}
          </span>
          <span class="d-block mb-5 white--text font-weight-bold text-h6">
            {{ doctor.full_name }}
          </span>
          <div class="tags d-flex justify-start align-start flex-wrap">
            <v-btn
              depressed
              link
              :to="{
                name: 'PublicDoctors',
                query: { department_id: doctor.department.id },
              }"
              class="primary_bg primary--text"
            >
              {{ doctor.department.name }}
            </v-btn>
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

            <!-- video reservaition -->
            <video-reservaition :doctor_id='doctor.id'/>

            <!-- written reservaition -->
            <written-reservaition :doctor_id='doctor.id'/>
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
  
  components: {
    VideoReservaition: () =>
      import("../components/doctor-profile/VideoReservaition.vue"),
    WrittenReservaition: () =>
      import("../components/doctor-profile/WrittenReservaition.vue"),
  },

  data: () => ({
    // doctor
    doctor: null,
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
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      // get doctors
      this.axios
        .get(`patient/doctors/${this.$route.params.id}`)
        .then((response) => {
          this.doctor = response.data.data;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>
