<template>
  <section class="doctors-carusel mb-16 pt-10">
    <v-container style="max-width: 1220px; min-height: 536px">
      <carousel-3d
        :perspective="340"
        :space="530"
        :display="3"
        :height="536"
        :width="492"
        :border="0"
        :inverse-scaling="150"
        :controls-visible="true"
        controlsNextHtml="&lsaquo;"
        controlsPrevHtml="&rsaquo;"
        v-if="doctors.length"
      >
        <slide
          v-for="(doctor, index) in doctors"
          :key="doctor.id"
          :index="index"
          class="rounded-lg"
          style="background-color: #f8fbff"
        >
          <div class="text-center">
            <v-avatar class="mb-5 rounded-lg" size="100%" max-height="328">
              <v-img
                :src="doctor.profile"
                :lazy-src="doctor.profile"
                cover
              ></v-img>
            </v-avatar>
            <div class="hide">
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
              <div class="actions-butto d-flex justify-center align-center">
                <v-btn
                  class="primary rounded-lg pa-6"
                  link
                  :to="{
                    name: 'PublicDoctorsProfile',
                    params: { id: doctor.id },
                  }"
                >
                  <v-icon class="ml-1">mdi-video</v-icon>
                  <span>استشارة مرئية</span>
                </v-btn>
                <v-btn
                  class="primary rounded-lg pa-6 mr-2"
                  link
                  :to="{
                    name: 'PublicDoctorsProfile',
                    params: { id: doctor.id },
                  }"
                >
                  <v-icon class="ml-1">mdi-file-multiple</v-icon>
                  <span>طلب تقرير طبي</span>
                </v-btn>
              </div>
            </div>
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

<style lang="scss">
.carousel-3d-slide {
  .v-responsive__sizer {
    padding-bottom: 67% !important;
  }

  .v-image__image {
    background-position: top !important;
  }

  &.left-1,
  &.right-1 {
    height: auto !important;
    .hide {
      display: none;
    }
  }
}

.carousel-3d-controls {
  top: 41% !important;

  .prev,
  .next {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ecf6fc;
    color: #008ad0;
    border: 1px solid #ffffff;
    border-radius: 10px;
    width: 35px !important;
    height: 35px !important;

    span {
      font-size: 40px;
    }
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
