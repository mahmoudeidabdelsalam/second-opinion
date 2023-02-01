<template>
  <section class="mb-16" style="direction: ltr">
    <v-container>
      <h1 class="primary--text text-center mb-10 text-h4 font-weight-bold">
        الاطباء
      </h1>

      <carousel
        class="mx-auto"
        style="max-width: 1400px"
        :nav="false"
        :dots="false"
        :margin="20"
        :autoplay="true"
        :autoplayTimeout="5000"
        :loop="true"
        :stagePadding="20"
        :responsive="{
          0: {
            items: 1,
          },
          600: {
            items: 2,
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
          class="pa-5 mb-5 rounded-lg elevation-3 white"
          style="direction: rtl"
          v-for="doctor in doctors"
          :key="doctor.id"
        >
          <img
            :src="doctor.profile"
            :lazy-src="doctor.profile"
            :alt="doctor.full_name"
            class="rounded-lg mb-5"
            style="height: 311px; object-fit: cover; object-position: top"
          />
          <span
            class="d-block text-center primary--text mb-2 font-weight-bold text-h6"
          >
            {{ doctor.full_name }}
          </span>
          <span
            class="d-block text-center font-weight-medium text--secondary mb-3"
            style="
              min-height: 48px;
              max-height: 48px;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ doctor.title }}
          </span>
          <v-btn
            class="primary rounded-lg mb-2 text-capitalize py-6 px-5 px-md-16 d-flex justify-start"
            block
            link
            :to="{ name: 'PublicDoctorsProfile', params: { id: doctor.id } }"
          >
            <v-icon>mdi-video</v-icon>
            <span class="px-2">استشارة صوتية/مرئية</span>
          </v-btn>
          <v-btn
            class="primary rounded-lg mb-2 text-capitalize py-6 px-5 px-md-16 d-flex justify-start"
            block
            link
            :to="{ name: 'PublicDoctorsProfile', params: { id: doctor.id } }"
          >
            <v-icon>mdi-file-multiple</v-icon>
            <span class="px-2">طلب تقرير طبي</span>
          </v-btn>
          <v-btn
            class="primary rounded-lg text-capitalize py-6 px-5 px-md-16 d-flex justify-start"
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
