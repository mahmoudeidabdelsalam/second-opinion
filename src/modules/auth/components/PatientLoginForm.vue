<template>
  <section class="patient-login-form">
    <v-form ref="form" :v-model="valid">
      <v-text-field
        v-model="loginForm.phone_number"
        :rules="phoneRules"
        label="رقم الهاتف"
        outlined
      ></v-text-field>

      <!-- remember me -->
      <v-checkbox label="تذكرني"></v-checkbox>

      <v-btn
        class="mb-3 white--text py-6"
        color="primary"
        block
        @click="sendOtp"
      >
        تسجيل الدخول
      </v-btn>
    </v-form>

    <div class="options d-flex justify-space-between" style="width: 100%">
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

      <!-- otp dialog -->
      <v-dialog v-model="checkOtpModal" persistent max-width="400">
        <v-card>
          <v-toolbar class="mb-5" elevation="0">
            <v-toolbar-title>التحddقق من OTP</v-toolbar-title>
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
                class="mt-3 white--text"
                color="primary"
                block
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
                dense
                autofocus
              ></v-text-field>

              <v-btn
                class="mt-3 white--text"
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
      <!-- <v-dialog v-model="checkOtpModal" persistent max-width="400">
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
            <v-form ref="form" :v-model="valid">
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
                @click="checkOtp"
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
              كلمة السر يجب ان تحتوي على ٨ احرف، ارقام ورموز.
            </span>

            <v-form ref="form" :v-model="valid">
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

    // forget password form data
    forgetPasswordForm: {
      username: "",
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

        this.axios
          .post(`patient/auth/send-login-otp`, data)
          .then((response) => {
            // set token in local storage
            localStorage.setItem("temporary_token", response.data.data.token);
            this.handleResponse(response);
            this.checkOtpModal = true;
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });
      }
    },

    // check otp method
    checkOtp() {
      // validate form
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("otp", this.checkOtpForm.otp);

        this.axios
          .post(`patient/auth/login`, data, {
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

    // close check otp modal
    closeCheckOtpModal() {
      this.checkOtpModal = false;
    },
  },
};
</script>
