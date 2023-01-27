<template>
  <div class="auth-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <div
            class="form-side d-flex flex-column justify-center align-start mx-auto pa-5"
          >
            <span class="mb-7 text-h5 font-weight-bold">
              تسجيل الدخول كمريض
            </span>

            <!-- patient login form -->
            <patient-login-form style="width: 100%" />
          </div>
        </v-col>

        <v-col cols="12" md="6" class="img-column hidden-sm-and-down">
          <div class="image-side">
            <div class="image mx-auto">
              <img src="@/assets/images/women-doctor.webp" alt="women doctor" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",

  components: {
    PatientLoginForm: () => import("../components/PatientLoginForm.vue"),
  },
};
</script>

<style lang="scss" scoped>
@import "../style/auth-page.scss";
</style>
