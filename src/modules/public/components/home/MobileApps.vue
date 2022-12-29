<template>
  <section class="mb-16" style="background-color: #2f79bd">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <div
            class="text-content d-flex flex-column justify-center mx-auto"
            style="height: 100%; max-width: 600px"
          >
            <span class="d-block mb-5 white--text font-weight-black text-h5">
              Download mobile app
            </span>
            <p class="white--text body-1 mb-7">
              For a better experience
              <br />
              and to benefit from all services,
              <br />
              Download your app now
            </p>
            <div class="stores buttons">
              <v-btn class="white text-capitalize font-weight-bold py-6">
                <v-icon class="mx-2">mdi-apple</v-icon>
                <span>App Store</span>
              </v-btn>
              <v-btn class="white text-capitalize font-weight-bold py-6 mx-3">
                <v-icon class="mx-2">mdi-google-play</v-icon>
                <span>Play Store</span>
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="image mx-auto" style="max-width: 600px">
            <img
              src="@/assets/images/mobile-apps.webp"
              alt="Mobile Apps"
              width="100%"
            />
          </div>
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
