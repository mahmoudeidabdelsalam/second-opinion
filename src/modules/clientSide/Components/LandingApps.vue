<template>
  <div>
    <div class="Landingapps">
      <div class="container">
        <v-row>
          <v-col cols="12" sm="6" class="appstext my-md-5 py-8 d-flex flex-column text-center text-sm-right">
            <p class="mb-7 font-weight-bold">حمل التطبيق</p>
            <span>لتجربة أفضل</span>
            <span>وللإستفادة من جميع الخدمات</span>
            <span>حمل تطبيقك الآن</span>
            <div class="appdownload d-flex flex-column flex-sm-row mt-7 mb-2 align-center align-sm-end">
              <div class="d-flex rounded-lg mb-2 mb-sm-0 ms-sm-2 py-1 px-2">
                <div class="py-2 iconholder d-flex justify-center align-center">
                  <img src="src/assets/images/Apple_logo_black.png"/>
                </div>
                <div class="d-flex flex-column ms-2 align-start">
                  <span>Download on the</span>
                  <span class="font-weight-bold">App Store</span>
                </div>
              </div>
              <div class="d-flex rounded-lg ms-sm-1 py-1 px-2">
                <div class="py-2 iconholder d-flex justify-center align-center">
                  <img src="src/assets/images/Google_Play_Arrow.png"/>
                </div>
                <div class="d-flex flex-column ms-2 align-start">
                  <span>GET IT ON</span>
                  <span class="font-weight-bold">Google Play</span>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="appsimgs d-none d-sm-flex py-0">
            <img src="src/assets/images/MobileApps/Group.png" style="max-width: 100%;"/>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "LandingApps",
  data() {
    return {
    };
  },
  components: {  }
}
</script>

<style lang="scss" scoped>
@import "../style/landing.scss";
</style>