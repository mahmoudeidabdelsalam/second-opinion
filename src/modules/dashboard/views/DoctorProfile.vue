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
                  src="https://dr-space-storage.nyc3.digitaloceanspaces.com/doctors/1226/c3njy2bKqZNOChjWRYEc7P7UrWawIp7nGTeZ3THH.jpg"
                  alt="doctor"
                  style="object-fit: cover"
                />
              </v-avatar>
              <span
                class="doctor-name d-block text-center font-weight-bold mb-1"
              >
                Aml Mahmoud
              </span>
              <span
                class="d-block text-center font-weight-bold secondary--text mb-5"
              >
                Pediatrics Specialty
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
                    Session price: 100 SAR
                  </span>
                  <span
                    class="session-price d-block font-weight-bold secondary--text"
                  >
                    Session duration: 30 minutes
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
                  <p
                    class="session-price d-block body-1 font-weight-regular secondary--text"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>

              <div class="details-part session rounded-lg mb-5 overflow-hidden">
                <div class="head secondary pa-3">
                  <span class="font-weight-bold white--text">
                    Medical Specialties
                  </span>
                </div>
                <div class="body pa-3">
                  <span class="d-block font-weight-bold secondary--text mb-2">
                    Pediatrics
                  </span>
                  <span class="d-block font-weight-bold secondary--text mb-2">
                    Kidney Diseases
                  </span>
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
export default {
  name: "DoctorProfile",

  data: () => ({
    tabs: null,
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
};
</script>

<style lang="scss" scoped>
.details-part {
  border: 1px solid #ddd;
}
</style>
