<template>
  <section class="doctors-carusel mb-16 pt-10">
    <v-container style="max-width: 1400px">
      <carousel-3d
        :perspective="35"
        :space="460"
        :display="3"
        :height="370"
        :autoplay="true"
        :autoplay-timeout="3000"
        v-if="doctors.length"
      >
        <slide
          v-for="(doctor, index) in doctors"
          :key="doctor.id"
          :index="index"
          class="rounded-lg white"
        >
          <div class="text-center">
            <img
              :src="doctor.profile"
              :lazy-src="doctor.profile"
              :alt="doctor.full_name"
              class="rounded-lg"
            />
            <span
              class="d-block text-center primary--text mb-1 text-h6 font-weight-bold"
            >
              {{ doctor.full_name }}
            </span>
            <span
              class="d-block text-center secondary--text mb-4 body-2 font-weight-bold text-truncate"
            >
              {{ doctor.title }}
            </span>
            <v-btn
              class="primary mx-auto rounded-lg mb-2 text-capitalize"
              link
              :to="{ name: 'PublicDoctorsProfile', params: { id: doctor.id } }"
            >
              <span class="px-2">احجز الان</span>
            </v-btn>
          </div>
        </slide>
      </carousel-3d>

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
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  name: "DoctorsCarusel",

  components: {
    Carousel3d,
    Slide,
  },

  props: {
    doctors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-3d-slide {
  img {
    width: 100%;
    max-height: 270px;
    object-fit: contain;
  }
}
.carousel-3d-container figure {
  margin: 0;
}

.carousel-3d-container figcaption {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  bottom: 0;
  position: absolute;
  bottom: 0;
  padding: 15px;
  font-size: 12px;
  min-width: 100%;
  box-sizing: border-box;
}
</style>
