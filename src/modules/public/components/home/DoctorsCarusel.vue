<template>
  <section class="doctors-carusel mb-16 pt-10">
    <v-container style="max-width: 1400px">
      <carousel-3d
        :perspective="35"
        :space="460"
        :display="3"
        :height="350"
        :autoplay="true"
        :autoplay-timeout="3000"
      >
        <slide
          v-for="(slide, index) in 6"
          :key="slide"
          :index="index"
          class="rounded-lg white"
        >
          <div>
            <img
              src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
              alt="Doctor"
              class="rounded-lg"
            />
            <span
              class="d-block text-center primary--text mb-1 text-h6 font-weight-bold"
            >
              Dr. Khaled Akram Mohammed
            </span>
            <span
              class="d-block text-center secondary--text mb-2 body-2 font-weight-bold"
            >
              Consultant Orthopedic - Spine Surgerys
            </span>
          </div>
        </slide>
      </carousel-3d>
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
};
</script>

<style lang="scss" scoped>
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
