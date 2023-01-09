<template>
  <main class="doctor-profile">
    <div class="container">
      <div
        class="doctor-card primary pa-5 mb-5 rounded-lg d-flex flex-column flex-md-row justify-start align-start"
      >
        <v-avatar class="rounded-lg mb-5" size="150">
          <v-img
            cover
            lazy-src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
            max-height="150"
            max-width="150"
            src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
            alt="article"
          ></v-img>
        </v-avatar>

        <div class="doctor-info mx-0 mx-md-4">
          <span class="d-block mb-2 white--text font-weight-bold text-h6">
            Internal Medicine Consultant
          </span>
          <span class="d-block mb-3 white--text font-weight-bold text-h6">
            Dr. Khaled Ibrahim
          </span>
          <div class="tags d-flex justify-start align-start flex-wrap">
            <span
              class="pa-2 mx-1 mb-1 primary_bg primary--text rounded-lg text-capitalize"
            >
              Pediatric Dermatology
            </span>
            <span
              class="pa-2 mx-1 mb-1 primary_bg primary--text rounded-lg text-capitalize"
            >
              Pediatric Dermatology
            </span>
            <span
              class="pa-2 mx-1 mb-1 primary_bg primary--text rounded-lg text-capitalize"
            >
              Pediatric Dermatology
            </span>
          </div>
        </div>
      </div>

      <v-row>
        <v-col cols="12" md="6">
          <div class="about-doctor white rounded-lg elevation-3 pa-5 mb-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-information-outline</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                About the doctor
              </span>
            </div>
            <p class="font-weight-light font-weight-bold secondary--text">
              She has extensive experience of 24 years working in tertiary care
              hospitals, has been a faculty member as an undergraduate and
              graduate teacher in renowned medical schools in Saudi Arabia for
              the past 24 years, specializing in assisted reproductive and
              insemination technologies.
            </p>
          </div>

          <div class="about-doctor white rounded-lg elevation-3 pa-5 mb-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-certificate</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                Certificates
              </span>
            </div>
            <p
              class="font-weight-light font-weight-bold secondary--text"
              v-for="item in 3"
              :key="item"
            >
              She has extensive experience of 24 years.
            </p>
          </div>

          <div class="about-doctor white rounded-lg elevation-3 pa-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-currency-usd</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                Pricing
              </span>
            </div>
            <p class="font-weight-light font-weight-bold secondary--text">
              <span class="primary--text">Consultation: </span>300 S.R
            </p>
            <p class="font-weight-light font-weight-bold secondary--text">
              <span class="primary--text">Medical report: </span>100 S.R
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="px-5">
            <div class="head mb-3">
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                Book your appointment
              </span>
            </div>
            <v-btn
              class="head primary white--text pa-7 mb-3 d-flex justify-start align-center rounded-lg"
              block
            >
              <v-icon class="white pa-1 rounded-lg" color="primary">
                mdi-video
              </v-icon>
              <span class="mx-2 font-weight-bold text-capitalize">
                Book your appointment
              </span>
            </v-btn>
            <v-btn
              class="head primary white--text pa-7 mb-3 d-flex justify-start align-center rounded-lg"
              block
            >
              <v-icon class="white pa-1 rounded-lg" color="primary">
                mdi-file-multiple
              </v-icon>
              <span class="mx-2 font-weight-bold text-capitalize">
                Request for written consultation
              </span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </main>
</template>

<script>
export default {
  name: "DoctorProfile",
};
</script>

<style></style>
