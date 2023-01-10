<template>
  <main class="doctors">
    <div class="bg mb-5 d-flex align-center">
      <v-container style="max-width: 1400px">
        <span class="white--text text-h5 font-weight-bold">
          Book the best doctors in the Kingdom
        </span>
      </v-container>
    </div>

    <div class="list mx-auto">
      <v-container style="max-width: 1400px">
        <v-row>
          <v-col cols="12" md="6" v-for="doctor in 4" :key="doctor">
            <div
              class="doctor primary pa-5 rounded-lg d-flex justify-start align-start"
            >
              <v-avatar class="rounded-lg" size="150">
                <v-img
                  cover
                  lazy-src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                  max-height="150"
                  max-width="150"
                  src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                  alt="article"
                ></v-img>
              </v-avatar>

              <div class="doctor-info mx-4">
                <span class="d-block mb-2 white--text font-weight-bold text-h6">
                  Dr. Khaled Ibrahim
                </span>
                <span class="d-block mb-2 white--text">
                  Specialty/ Internal Medicine
                </span>
                <p class="white--text body-2">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
                  repellendus incidunt ea sapiente error.
                </p>
                <v-btn
                  class="white rounded-lg text-capitalize primary--text font-weight-bold"
                  depressed
                >
                  Request a Consultation
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </main>
</template>

<script>
export default {
  name: "Doctors",
};
</script>

<style lang="scss" scoped>
@import "../style/doctors.scss";
</style>
