<template>
  <section class="patient-login-form">
    <v-form ref="form" :v-model="valid" @submit.prevent>
      <v-text-field
        v-model="loginForm.phone_number"
        :rules="phoneRules"
        label="رقم الهاتف"
        outlined
        autofocus
        @keydown.enter="sendOtp"
      ></v-text-field>

      <!-- remember me -->
      <v-checkbox label="تذكرني"></v-checkbox>

      <v-btn
        class="mb-3 white--text py-6"
        color="primary"
        block
        :loading="loading1"
        :disabled="loading1"
        @click="sendOtp"
      >
        تسجيل الدخول
      </v-btn>
    </v-form>

    <div class="options d-flex justify-center align-center" style="width: 100%">
      <span>لا تمتلك حساب؟ </span>
      <v-btn
        class="text-capitalize"
        color="primary"
        text
        link
        :to="{ name: 'Register' }"
      >
        التسجيل الان
      </v-btn>

      <!-- <v-btn
        class="text-capitalize"
        color="primary"
        text
        @click.stop="openForgetPasswordModal"
      >
        نسيت كلمة المرور؟
      </v-btn> -->

      <!-- otp dialog -->
      <v-dialog v-model="checkOtpModal" persistent max-width="400">
        <v-card>
          <v-toolbar class="mb-5" elevation="0">
            <v-toolbar-title>التحقق من OTP</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeCheckOtpModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <span class="d-block body-2 mb-7">
              برجاء ادخال الكود المرسل على رقم الهاتف
            </span>
            <v-form ref="form" :v-model="valid">
              <v-otp-input
                length="4"
                v-model="checkOtpForm.otp"
                :rules="otpRules"
                style="direction: ltr"
              ></v-otp-input>

              <v-btn
                class="mt-3 py-6 white--text"
                color="primary"
                block
                :loading="loading2"
                :disabled="loading2"
                @click="checkOtp"
              >
                تحقق
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- forgot password dialog -->
      <!-- <v-dialog v-model="forgetPasswordModal" persistent max-width="400">
        <v-card>
          <v-toolbar class="mb-5" elevation="0">
            <v-toolbar-title>هل نسيت كلمة المرور؟</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="closeForgetPasswordModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" :v-model="valid">
              <v-text-field
                v-model="forgetPasswordForm.username"
                :rules="phoneRules"
                label="ادخل رقم الهاتف"
                outlined
                autofocus
              ></v-text-field>

              <v-btn
                class="mt-3 py-6 white--text"
                color="primary"
                block
                @click="forgetPassword"
              >
                استرداد الحساب
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog> -->

      <!-- otp dialog -->
      <!-- <v-dialog v-model="checkOtpForgetModal" persistent max-width="400">
        <v-card>
          <v-toolbar class="mb-5" elevation="0">
            <v-toolbar-title>التحقق من OTP</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="closecheckOtpForgetModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <span class="d-block body-2 mb-7">
              برجاء ادخال الكود المرسل على رقم الهاتف
            </span>
            <v-form ref="form" :v-model="valid">
              <v-otp-input
                length="4"
                v-model="checkOtpForgetForm.code"
                :rules="otpRules"
                style="direction: ltr"
              ></v-otp-input>

              <v-btn
                class="mt-3 py-6 white--text"
                color="primary"
                block
                @click="checkOtpForget"
              >
                تحقق
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog> -->

      <!-- reset password dialog -->
      <!-- <v-dialog v-model="resetPasswordModal" persistent max-width="400">
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
              كلمة المرور يجب ان تحتوي على 6 احرف على الاقل
            </span>

            <v-form ref="form" :v-model="valid">
              <v-text-field
                v-model="resetPasswordForm.password"
                :rules="passwordRules"
                label="ادخل كلمة المرور الجديدة"
                outlined
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
              ></v-text-field>

              <v-btn
                class="mt-3 py-6 white--text"
                color="primary"
                block
                @click="resetPassword"
              >
                تغيير كلمة المرور
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog> -->
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PatientLoginForm",

  data: () => ({
    // buttons loading
    loading1: false,
    loading2: false,

    // login form
    loginForm: {
      phone_number: "",
    },

    // check otp modal
    checkOtpModal: false,
    // check otp form
    checkOtpForm: {
      otp: "",
    },

    // forget password modal
    forgetPasswordModal: false,
    // forget password form data
    forgetPasswordForm: {
      username: "",
    },

    // check otp forget modal
    checkOtpForgetModal: false,
    // check otp forget form
    checkOtpForgetForm: {
      code: "",
    },

    // reset password modal
    resetPasswordModal: false,
    // reset password form data
    resetPasswordForm: {
      password: "",
      password_confirmation: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      phoneRules: "validationRules/phoneRules",
      otpRules: "validationRules/otpRules",
      passwordRules: "validationRules/passwordRules",
      confirmPasswordRules: "validationRules/confirmPasswordRules",
    }),
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
      attemptLogin: "login/attemptLogin",
    }),

    // send otp method
    sendOtp() {
      // validate form
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("phone_number", this.loginForm.phone_number);

        // show loading1
        this.loading1 = true;

        this.axios
          .post(`patient/auth/send-login-otp`, data)
          .then((response) => {
            // set temporary token in local storage
            localStorage.setItem("temporary_token", response.data.data.token);
            this.handleResponse(response);
            this.checkOtpModal = true;

            // hide loading1
            this.loading1 = false;
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide loading1
            this.loading1 = false;
          });
      }
    },

    // check otp method
    checkOtp() {
      // validate form
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("otp", this.checkOtpForm.otp);

        // show loading2
        this.loading2 = true;

        this.axios
          .post(`patient/auth/login`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.temporary_token}`,
            },
          })
          .then((response) => {
            // remove temporary token from local storage
            localStorage.removeItem("temporary_token");
            // set status == 1 to local storage
            localStorage.setItem("status", 1);
            // attempt login
            this.attemptLogin(response.data.data.token);
            this.handleResponse(response);

            // hide loading2
            this.loading2 = false;
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide loading2
            this.loading2 = false;
          });
      }
    },

    // close check otp modal
    closeCheckOtpModal() {
      this.checkOtpModal = false;
    },

    // open forget password modal
    openForgetPasswordModal() {
      this.forgetPasswordModal = true;
    },

    // send forget password otp method
    forgetPassword() {
      // validate form
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("username", this.forgetPasswordForm.username);

        this.axios
          .post(`auth/forget-password`, data)
          .then((response) => {
            this.handleResponse(response);
            // close forget password modal
            this.closeForgetPasswordModal();
            // open check otp modal
            this.checkOtpForgetModal = true;
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });
      }
    },

    //close forget password modal
    closeForgetPasswordModal() {
      this.forgetPasswordModal = false;
    },

    // check otp forget method
    checkOtpForget() {
      // validate form
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("username", this.forgetPasswordForm.username);
        data.append("code", this.checkOtpForgetForm.code);

        this.axios
          .post(`auth/check-code`, data)
          .then((response) => {
            // set token in local storage
            localStorage.setItem("temporary_token", response.data.data.token);
            this.handleResponse(response);
            // close check otp forget modal
            this.closeCheckOtpForgetModal();
            // open reset password modal
            this.resetPasswordModal = true;
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });
      }
    },

    // close check otp forget modal
    closeCheckOtpForgetModal() {
      this.checkOtpForgetModal = false;
    },

    // reset password method
    resetPassword() {
      // validate form
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("password", this.resetPasswordForm.password);
        data.append(
          "password_confirmation",
          this.resetPasswordForm.password_confirmation
        );

        this.axios
          .post(`auth/reset-password`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.temporary_token}`,
            },
          })
          .then((response) => {
            // remove temporary token from local storage
            localStorage.removeItem("temporary_token");
            // attempt login
            this.attemptLogin(response.data.data.token);
            this.handleResponse(response);
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });
      }
    },
  },
};
</script>
