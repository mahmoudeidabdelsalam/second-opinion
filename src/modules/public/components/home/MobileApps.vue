<template>
  <section class="mb-16" style="background-color: #2f79bd">
    <v-container style="max-width: 1400px">
      <v-row>
        <v-col cols="12" md="6">
          <div
            class="text-content d-flex flex-column justify-center"
            style="height: 100%"
          >
            <span class="d-block mb-10 white--text font-weight-black text-h4">
              حمّل التطبيق
            </span>
            <p class="white--text body-1 mb-10">
              لتجربة افضل
              <br />
              و للاستفادة من جميع الخدمات
              <br />
              حمّل التطبيق الآن
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

        <v-col cols="12" md="6" class="pa-0" style="margin-bottom: -6px">
          <div class="image">
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
