<template>
  <section class="mb-16" style="background-color: #2f79bd">
    <v-container style="max-width: 1400px">
      <v-row>
        <v-col cols="12" md="6" class="order-1 order-md-0">
          <div
            class="text-content d-flex flex-column justify-center text-center text-md-start"
            style="height: 100%"
          >
            <span
              class="d-block mb-10 mt-5 white--text font-weight-bold text-h4"
            >
              حمّل التطبيق
            </span>
            <p class="white--text text-h5 mb-10" style="line-height: 1.8">
              لتجربة افضل
              <br />
              و للاستفادة من جميع الخدمات
              <br />
              حمّل التطبيق الآن
            </p>
            <div
              class="stores buttons d-flex flex-column flex-md-row justify-start align-center"
            >
              <v-btn
                class="white rounded-lg py-7 d-flex justify-start align-center"
              >
                <div class="text d-flex flex-column align-end px-2">
                  <span
                    class="font-weight-medium text-capitalize"
                    style="margin-bottom: -8px"
                  >
                    Download on the
                  </span>
                  <span class="text-capitalize font-weight-bold text-h6">
                    App Store
                  </span>
                </div>
                <v-avatar size="32">
                  <v-img
                    :src="require('@/assets/images/apple.webp')"
                    :lazy-src="require('@/assets/images/apple.webp')"
                    contain
                  ></v-img>
                </v-avatar>
              </v-btn>

              <v-btn
                class="white rounded-lg py-7 my-2 mx-0 mx-md-4 d-flex justify-start align-center"
              >
                <div class="text d-flex flex-column align-end px-2">
                  <span
                    class="font-weight-medium text-uppercase"
                    style="margin-bottom: -8px"
                  >
                    Get it on
                  </span>
                  <span class="text-capitalize font-weight-bold text-h6">
                    Google Play
                  </span>
                </div>
                <v-avatar size="32">
                  <v-img
                    :src="require('@/assets/images/google-play.webp')"
                    :lazy-src="require('@/assets/images/google-play.webp')"
                    contain
                  ></v-img>
                </v-avatar>
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="6"
          class="pa-0 order-0 order-md-1"
          style="margin-top: -51px; margin-bottom: -51px"
        >
          <v-avatar tile size="620">
            <v-img
              :src="require('@/assets/images/mobile-apps.webp')"
              :lazy-src="require('@/assets/images/mobile-apps.webp')"
              alt="Mobile Apps"
              contain
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "MobileApps",
};
</script>

<style lang="scss" scoped></style>
