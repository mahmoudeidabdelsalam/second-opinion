<template>
  <div class="auth-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6">
          <div
            class="form-side d-flex flex-column justify-center align-start mx-auto pa-5"
          >
            <h1 class="mb-7">تسجيل الدخول</h1>

            <v-form ref="form" :v-model="valid" lazy-validation>
              <v-text-field
                v-model="loginForm.email"
                :rules="phoneOrEmailRules"
                label="ادخل رقم الهاتف او البريد الالكتروني"
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="loginForm.password"
                :rules="passwordRules"
                type="password"
                label="كلمة المرور"
                outlined
                dense
                @keydown.enter="login"
              ></v-text-field>

              <!-- remember me -->
              <v-checkbox
                v-model="loginForm.rememberMe"
                label="تذكرني"
              ></v-checkbox>

              <v-btn
                class="mb-3 white--text"
                color="primary"
                block
                :loading="loginLoading"
                :disabled="loginLoading"
                @click="login"
              >
                تسجيل الدخول
              </v-btn>
            </v-form>

            <div
              class="options d-flex justify-space-between"
              style="width: 100%"
            >
              <v-btn
                class="text-capitalize"
                color="primary"
                text
                link
                :to="{ name: 'Register' }"
              >
                إنشاء حساب جديد
              </v-btn>

              <v-btn
                class="text-capitalize"
                color="primary"
                text
                @click.stop="openForgetPasswordModal"
              >
                نسيت كلمة المرور؟
              </v-btn>
              <!-- forgot password dialog -->
              <v-dialog
                v-model="forgetPasswordModal"
                persistent
                max-width="400"
              >
                <v-card>
                  <v-toolbar class="mb-5" elevation="0">
                    <v-toolbar-title>هل نسيت كلمة المرور؟</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.stop="closeForgetPasswordModal">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <v-form ref="form" :v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="forgetPasswordForm.username"
                        :rules="phoneOrEmailRules"
                        label="ادخل رقم الهاتف او البريد الالكتروني"
                        outlined
                        dense
                        autofocus
                      ></v-text-field>

                      <v-btn
                        class="mt-3 white--text"
                        color="primary"
                        block
                        :loading="forgetLoading"
                        :disabled="forgetLoading"
                        @click="forgetPassword"
                      >
                        استرداد الحساب
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <!-- otp dialog -->
              <v-dialog v-model="checkOtpModal" persistent max-width="400">
                <v-card>
                  <v-toolbar class="mb-5" elevation="0">
                    <v-toolbar-title>التحقق من OTP</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.stop="closeCheckOtpModal">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <span class="d-block body-2 mb-7">
                      برجاء ادخال الكود المرسل على رقم الهاتف
                    </span>
                    <v-form ref="form" :v-model="valid" lazy-validation>
                      <v-otp-input
                        length="4"
                        v-model="checkOtpForm.code"
                        :rules="otpRules"
                        style="direction: ltr"
                      ></v-otp-input>

                      <v-btn
                        class="mt-3 white--text"
                        color="primary"
                        block
                        :loading="checkOtpLoading"
                        :disabled="checkOtpLoading"
                        @click="checkOtp"
                      >
                        تحقق
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <!-- reset password dialog -->
              <v-dialog v-model="resetPasswordModal" persistent max-width="400">
                <v-card>
                  <v-toolbar class="mb-5" elevation="0">
                    <v-toolbar-title>انشاء كلمة المرور</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.stop="closeResetPasswordModal">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <span class="d-block body-2 mb-7">
                      كلمة السر يجب ان تحتوي على ٨ احرف، ارقام ورموز.
                    </span>

                    <v-form ref="form" :v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="resetPasswordForm.password"
                        :rules="passwordRules"
                        label="ادخل كلمة المرور الجديدة"
                        outlined
                        dense
                        autofocus
                      ></v-text-field>

                      <v-text-field
                        v-model="resetPasswordForm.password_confirmation"
                        :rules="[
                          ...confirmPasswordRules,
                          (v) =>
                            v === resetPasswordForm.password ||
                            'كلمة المرور غير متطابقة',
                        ]"
                        label="تأكيد كلمة المرور"
                        outlined
                        dense
                      ></v-text-field>

                      <v-btn
                        class="mt-3 white--text"
                        color="primary"
                        block
                        :loading="resetPasswordLoading"
                        :disabled="resetPasswordLoading"
                        @click="resetPassword"
                      >
                        تغيير كلمة المرور
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="primary pa-0 hidden-sm-and-down">
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
  name: "Login",

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
