<template>
  <section class="white rounded-lg pa-3">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <div class="doctor">
            <span class="d-block text-h6 font-weight-bold mb-5">
              Doctor details
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
                class="d-block text-center font-weight-bold secondary--text mb-1"
              >
                {{ doctor.title }}
              </span>
              <span
                class="d-block text-center font-weight-bold body-2 secondary--text mb-5"
              >
                {{ doctor.department.name }}
              </span>
              <div class="details-part session rounded-lg mb-5 overflow-hidden">
                <div class="head secondary pa-3">
                  <span class="font-weight-bold white--text">
                    Session details
                  </span>
                </div>
                <div class="body pa-3">
                  <span
                    class="session-price d-block font-weight-bold secondary--text mb-2"
                  >
                    Session price: {{ doctor.session_price }} SAR
                  </span>
                  <span
                    class="session-price d-block font-weight-bold secondary--text"
                  >
                    Session duration: {{ doctor.session_duration }} minutes
                  </span>
                </div>
              </div>

              <div class="details-part session rounded-lg mb-5 overflow-hidden">
                <div class="head secondary pa-3">
                  <span class="font-weight-bold white--text">
                    About the doctor
                  </span>
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
                    Doctor education
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
                    Doctor experiences
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
            <v-tab
              href="#mobile-tabs-5-1"
              class="font-weight-bold text-capitalize"
              active-class="primary--text active-tab"
            >
              Reservations
            </v-tab>

            <v-tab
              href="#mobile-tabs-5-2"
              class="font-weight-bold text-capitalize"
              active-class="primary--text active-tab"
            >
              Appointments
            </v-tab>

            <v-tab
              href="#mobile-tabs-5-3"
              class="font-weight-bold text-capitalize"
              active-class="primary--text active-tab"
            >
              Details
            </v-tab>

            <v-tab
              href="#mobile-tabs-5-4"
              class="font-weight-bold text-capitalize"
              active-class="primary--text active-tab"
            >
              Cost
            </v-tab>

            <v-tab
              href="#mobile-tabs-5-5"
              class="font-weight-bold text-capitalize"
              active-class="primary--text active-tab"
            >
              Patients
            </v-tab>
          </v-tabs>

          <v-tabs-items
            v-model="tabs"
            class="pa-5 rounded-lg rounded-tl-0 rounded-tr-0 elevation-3"
          >
            <v-tab-item value="mobile-tabs-5-1">
              <doctor-reservations></doctor-reservations>
            </v-tab-item>

            <v-tab-item value="mobile-tabs-5-2">
              <doctor-appointments></doctor-appointments>
            </v-tab-item>

            <v-tab-item value="mobile-tabs-5-3">
              <doctor-details></doctor-details>
            </v-tab-item>

            <v-tab-item value="mobile-tabs-5-4">
              <doctor-cost></doctor-cost>
            </v-tab-item>

            <v-tab-item value="mobile-tabs-5-5">
              <doctor-patients></doctor-patients>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DoctorProfile",

  data: () => ({
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
    DoctorCost: () => import("../components/doctor-profile/Cost.vue"),
    DoctorPatients: () => import("../components/doctor-profile/Patients.vue"),
  },

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
      // get doctor data
      this.getData(`dashboard/doctors/${this.$route.params.id}`).then((res) => {
        this.doctor = res;
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