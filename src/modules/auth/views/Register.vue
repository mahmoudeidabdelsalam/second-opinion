<template>
  <div class="auth-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6" class="pa-0">
          <div
            class="form-side d-flex flex-column justify-center align-start mx-auto py-10 px-5"
          >
            <span class="mb-7 text-h5 font-weight-bold"> انشاء حساب </span>

            <register-form style="width: 100%" />

            <div
              class="options d-flex justify-center align-center"
              style="width: 100%"
            >
              <span>تمتلك حساب </span>
              <v-btn
                class="text-capitalize"
                color="primary"
                text
                link
                :to="{ name: 'Login' }"
              >
                تسجيل الدخول
              </v-btn>
            </div>
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
  name: "Register",

  components: {
    RegisterForm: () => import("../components/RegisterForm.vue"),
  },
};
</script>

<style lang="scss" scoped>
@import "../style/auth-page.scss";
</style>
