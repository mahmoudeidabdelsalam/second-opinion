<template>
  <div class="auth-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <div
            class="form-side d-flex flex-column justify-center align-start mx-auto pa-5"
          >
            <span class="mb-7 text-h5 font-weight-bold">
              تسجيل الدخول كطبيب
            </span>

            <doctor-login-form style="width: 100%" />
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DoctorLogin",

  components: {
    DoctorLoginForm: () => import("../components/DoctorLoginForm.vue"),
  },

  data: () => ({
    // buttons loader
    loader: null,
    loginLoading: false,
    forgetLoading: false,
    checkOtpLoading: false,
    resetPasswordLoading: false,

    // login form data
    loginForm: {
      email: "",
      password: "",
    },

    // forget password form data
    forgetPasswordForm: {
      username: "",
    },

    // otp code
    checkOtpForm: {
      code: "",
    },

    // reset password form data
    resetPasswordForm: {
      password: "",
      password_confirmation: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      phoneOrEmailRules: "validationRules/phoneOrEmailRules",
      passwordRules: "validationRules/passwordRules",
      confirmPasswordRules: "validationRules/confirmPasswordRules",
      otpRules: "validationRules/otpRules",

      forgetPasswordModal: "forget/forgetPasswordModal",
      checkOtpModal: "forget/checkOtpModal",
      resetPasswordModal: "forget/resetPasswordModal",
    }),
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 2000);

      this.loader = null;
    },
  },

  methods: {
    ...mapActions({
      // login action
      loginAction: "login/login",

      // open forget password modal action
      openForgetPasswordModalAction: "forget/openForgetPasswordModal",
      // forget password action
      forgetPasswordAction: "forget/forgetPassword",
      // close forget password modal action
      closeForgetPasswordModalAction: "forget/closeForgetPasswordModal",

      // open check otp modal action
      openCheckOtpModalAction: "forget/openCheckOtpModal",
      // check otp action
      checkOtpAction: "forget/checkOtp",
      // close check otp modal action
      closeCheckOtpModalAction: "forget/closeCheckOtpModal",

      // open reset password modal action
      openResetPasswordModalAction: "forget/openResetPasswordModal",
      // reset password action
      resetPasswordAction: "forget/resetPassword",
      // close reset password modal action
      closeResetPasswordModalAction: "forget/closeResetPasswordModal",
    }),

    // login method
    login() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "loginLoading";
        this.loginAction(this.loginForm);
      }
    },

    // open forget password modal
    openForgetPasswordModal() {
      this.openForgetPasswordModalAction();
    },

    // close forget password modal
    closeForgetPasswordModal() {
      this.closeForgetPasswordModalAction();
      // reset form
      this.$refs.form.reset();
    },

    // forget password method
    forgetPassword() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "forgetLoading";
        this.forgetPasswordAction(this.forgetPasswordForm);
      }
    },

    // open check otp modal
    openCheckOtpModal() {
      this.openCheckOtpModalAction();
    },

    // close check otp modal
    closeCheckOtpModal() {
      this.closeCheckOtpModalAction();
      // reset form
      this.$refs.form.reset();
    },

    // check otp method
    checkOtp() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "checkOtpLoading";
        this.checkOtpAction({
          username: this.forgetPasswordForm.username,
          code: this.checkOtpForm.code,
        });
      }
    },

    // open reset password modal
    openResetPasswordModal() {
      this.openResetPasswordModalAction();
    },

    // close reset password modal
    closeResetPasswordModal() {
      this.closeResetPasswordModalAction();
      // reset form
      this.$refs.form.reset();
    },

    // reset password method
    resetPassword() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "resetPasswordLoading";
        this.resetPasswordAction(this.resetPasswordForm);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/auth-page.scss";
</style>
