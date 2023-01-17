<template>
  <section class="mb-16">
    <v-container>
      <h1 class="primary--text text-center mb-10">الاطباء</h1>

      <carousel
        class="mx-auto"
        style="max-width: 1400px"
        :nav="false"
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
        v-if="doctors.length"
      >
        <div
          class="pa-5 ma-5 rounded-lg elevation-3 white"
          v-for="doctor in doctors"
          :key="doctor.id"
        >
          <img
            :src="doctor.profile"
            :lazy-src="doctor.profile"
            class="rounded-lg mb-5"
          />
          <h1 class="text-center primary--text mb-2">
            {{ doctor.full_name }}
          </h1>
          <span
            class="d-block text-center font-weight-bold text--secondary mb-3"
          >
            {{ doctor.title }}
          </span>
          <v-btn
            class="primary rounded-lg mb-2 text-capitalize"
            block
            link
            :to="{ name: 'PublicDoctorsProfile', params: { id: doctor.id } }"
          >
            <v-icon>mdi-video</v-icon>
            <span class="px-2">استشارة صوتية/مرئية</span>
          </v-btn>
          <v-btn
            class="primary rounded-lg mb-2 text-capitalize"
            block
            link
            :to="{ name: 'PublicDoctorsProfile', params: { id: doctor.id } }"
          >
            <v-icon>mdi-file-multiple</v-icon>
            <span class="px-2">طلب تقرير طبي</span>
          </v-btn>
          <v-btn
            class="primary rounded-lg text-capitalize"
            block
            link
            :to="{ name: 'PublicDoctorsProfile', params: { id: doctor.id } }"
          >
            <v-icon>mdi-doctor</v-icon>
            <span class="px-2">مشاهدة صفحة الطبيب</span>
          </v-btn>
        </div>
      </carousel>

      <!-- waiting for data -->
      <v-skeleton-loader
        v-else
        class="mx-auto"
        max-width="300"
        type="card"
      ></v-skeleton-loader>
    </v-container>
  </section>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  name: "Doctors",

  components: { carousel },

  props: {
    doctors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped></style>
