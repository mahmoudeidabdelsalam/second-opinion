<template>
  <section class="mb-16">
    <v-container>
      <h1 class="primary--text text-center mb-10">Doctors</h1>

      <carousel
        class="mx-auto"
        style="max-width: 1400px"
        :nav="false"
        :autoplay="true"
        :dots="false"
        :responsive="{
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 2,
          },
          1400: {
            items: 3,
          },
        }"
      >
        <div
          class="pa-5 ma-5 rounded-lg elevation-3 white"
          v-for="item in 5"
          :key="item"
        >
          <img
            src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
            class="rounded-lg mb-5"
          />
          <h1 class="text-center primary--text mb-2">
            Dr. Khaled Akram Mohammed
          </h1>
          <span
            class="d-block text-center font-weight-bold text--secondary mb-3"
          >
            Specialty/ Internal Medicine
          </span>
          <v-btn class="primary rounded-lg mb-2 text-capitalize" block>
            <v-icon>mdi-video</v-icon>
            <span class="px-2">Audio/Video Consultation</span>
          </v-btn>
          <v-btn class="primary rounded-lg mb-2 text-capitalize" block>
            <v-icon>mdi-file-multiple</v-icon>
            <span class="px-2">Request a Medical Report</span>
          </v-btn>
          <v-btn class="primary rounded-lg text-capitalize" block>
            <v-icon>mdi-doctor</v-icon>
            <span class="px-2">View Doctor's Page</span>
          </v-btn>
        </div>
      </carousel>
    </v-container>
  </section>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  name: "Doctors",

  components: { carousel },
};
</script>

<style lang="scss" scoped></style>
