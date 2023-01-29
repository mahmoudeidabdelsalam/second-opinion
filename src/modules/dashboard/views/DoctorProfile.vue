<template>
  <section class="white rounded-lg pa-3">
    <v-container fluid>
      <v-row v-if="!waitingForData">
        <v-col cols="12" md="3">
          <div class="doctor">
            <span class="d-block text-h6 font-weight-bold mb-5">
              بيانات الطبيب
            </span>

            <div class="doctor-card">
              <v-avatar size="70" class="d-block mx-auto mb-3" rounded="circle">
                <img
                  :src="doctor.profile"
                  :lazy-src="doctor.profile"
                  alt="doctor"
                  style="object-fit: cover"
                />
              </v-avatar>
              <span
                class="doctor-name d-block text-center font-weight-bold mb-1"
              >
                {{ doctor.full_name }}
              </span>
              <span
                class="d-block text-center font-weight-medium body-2 secondary--text mb-1"
              >
                {{ doctor.title }}
              </span>
              <span
                class="d-block text-center font-weight-medium body-2 secondary--text mb-5"
              >
                {{ doctor.department.name }}
              </span>

              <div class="details-part session rounded-lg mb-5 overflow-hidden">
                <div class="head secondary pa-3">
                  <span class="font-weight-bold white--text"> عن الطبيب </span>
                </div>
                <div class="body pa-3">
                  <p class="body-1 font-weight-regular secondary--text">
                    {{ doctor.description }}
                  </p>
                </div>
              </div>

              <div class="details-part session rounded-lg mb-5 overflow-hidden">
                <div class="head secondary pa-3">
                  <span class="font-weight-bold white--text">
                    تفاصيل الجلسة
                  </span>
                </div>
                <div class="body pa-3">
                  <span
                    class="session-price d-block font-weight-bold secondary--text mb-2"
                  >
                    سعر الحجز: {{ doctor.session_price }} ريال
                  </span>
                  <span
                    class="session-price d-block font-weight-bold secondary--text"
                  >
                    مدة الحجز: {{ doctor.session_duration }} دقيقة
                  </span>
                </div>
              </div>

              <div class="details-part session rounded-lg mb-5 overflow-hidden">
                <div class="head secondary pa-3">
                  <span class="font-weight-bold white--text">
                    الشهادات العلمية
                  </span>
                </div>
                <div class="body pa-3">
                  <p class="body-1 font-weight-regular secondary--text">
                    {{ doctor.educations }}
                  </p>
                </div>
              </div>

              <div class="details-part session rounded-lg mb-5 overflow-hidden">
                <div class="head secondary pa-3">
                  <span class="font-weight-bold white--text">
                    الخبرة العملية
                  </span>
                </div>
                <div class="body pa-3">
                  <p class="body-1 font-weight-regular secondary--text">
                    {{ doctor.experiences }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="9">
          <v-tabs
            v-model="tabs"
            class="rounded-lg rounded-bl-0 rounded-br-0 elevation-3"
            style="max-width: max-content"
          >
            <v-tabs-slider></v-tabs-slider>
            <!-- <v-tab
              href="#mobile-tabs-5-1"
              class="font-weight-bold text-capitalize px-10"
              active-class="primary--text active-tab"
            >
              الحجوزات
            </v-tab> -->

            <v-tab
              href="#mobile-tabs-5-3"
              class="font-weight-bold text-capitalize px-10"
              active-class="primary--text active-tab"
            >
              التفاصيل
            </v-tab>

            <v-tab
              href="#mobile-tabs-5-2"
              class="font-weight-bold text-capitalize px-10"
              active-class="primary--text active-tab"
            >
              المواعيد
            </v-tab>

            <!-- <v-tab
              href="#mobile-tabs-5-5"
              class="font-weight-bold text-capitalize px-10"
              active-class="primary--text active-tab"
            >
              المرضى
            </v-tab> -->
          </v-tabs>

          <v-tabs-items
            v-model="tabs"
            class="pa-5 rounded-lg rounded-tl-0 rounded-tr-0 elevation-3"
          >
            <v-tab-item value="mobile-tabs-5-1">
              <doctor-reservations
                :reservations="doctor.reservations"
              ></doctor-reservations>
            </v-tab-item>

            <v-tab-item value="mobile-tabs-5-3">
              <doctor-details
                :doctor="doctor"
                :department="doctor"
              ></doctor-details>
            </v-tab-item>

            <v-tab-item value="mobile-tabs-5-2">
              <doctor-appointments></doctor-appointments>
            </v-tab-item>

            <v-tab-item value="mobile-tabs-5-5">
              <doctor-patients :patients="doctor.patients"></doctor-patients>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>

      <!-- waiting for data -->
      <v-skeleton-loader
        v-if="waitingForData"
        max-width="300"
        type="card"
      ></v-skeleton-loader>
    </v-container>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DoctorProfile",

  data: () => ({
    // waiting for data
    waitingForData: false,

    // tabs
    tabs: null,

    // doctor data
    doctor: [],
  }),

  components: {
    DoctorReservations: () =>
      import("../components/doctor-profile/Reservations.vue"),
    DoctorAppointments: () =>
      import("../components/doctor-profile/Appointments.vue"),
    DoctorDetails: () =>
      import("../components/doctor-profile/DoctorDetails.vue"),
    DoctorPatients: () => import("../components/doctor-profile/Patients.vue"),
  },

  created() {
    // init data
    this.initData();
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      this.waitingForData = true;

      // get doctor data
      this.axios
        .get(`dashboard/doctors/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          // hide waiting
          this.waitingForData = false;
          // set data
          this.doctor = response.data.data;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.details-part {
  border: 1px solid #ddd;
}
</style>
