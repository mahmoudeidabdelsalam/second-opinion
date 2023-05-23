<template>
  <section class="register-form">
    <v-form ref="form" :v-model="valid">
      <v-text-field
        v-model="form.name"
        :rules="nameRules"
        label="الاسم"
        outlined
        autofocus
      ></v-text-field>

      <!-- <v-text-field
        v-model="form.email"
        :rules="emailRules"
        type="email"
        label="البريد الإلكتروني"
        outlined
      ></v-text-field> -->

      <v-text-field
        v-model="form.phone_number"
        :rules="phoneRules"
        suffix="966+"
        type="tel"
        label="رقم الهاتف"
        outlined
      ></v-text-field>

      <!-- accept terms and conditions -->
      <v-checkbox
        :rules="[(v) => !!v || '']"
        label="أوافق على الشروط والأحكام"
      ></v-checkbox>

      <v-btn
        class="mb-3 white--text py-6"
        color="primary"
        block
        :loading="loading1"
        :disabled="loading1"
        @click="sendOtp"
      >
        انشاء حساب
      </v-btn>
    </v-form>

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
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RegisterForm",

  data: () => ({
    // buttons loading
    loading1: false,
    loading2: false,

    // register form data
    form: {
      name: "",
      email: "",
      phone_number: "",
    },

    // check otp modal
    checkOtpModal: false,

    // check otp form
    checkOtpForm: {
      otp: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      otpRules: "validationRules/otpRules",
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
        data.append("name", this.form.name);
        // data.append("email", this.form.email);
        data.append("phone_number", '966' + this.form.phone_number);

        // show loading1
        this.loading1 = true;

        this.axios
          .post(`auth/register`, data)
          .then((response) => {
            // set token in local storage
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
  },
};
</script>
