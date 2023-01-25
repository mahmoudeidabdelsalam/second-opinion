<template>
  <div class="auth-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6" class="pa-0">
          <div
            class="form-side d-flex flex-column justify-center align-start mx-auto py-10 px-5"
          >
            <span class="mb-7 text-h5 font-weight-bold"> انشاء حساب </span>

            <v-form ref="form" :v-model="valid">
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                label="الاسم"
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                type="email"
                label="البريد الإلكتروني"
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="form.phone_number"
                :rules="phoneRules"
                type="tel"
                label="رقم الهاتف"
                outlined
                dense
              ></v-text-field>

              <!-- accept terms and conditions -->
              <v-checkbox
                v-model="form.acceptTerms"
                :rules="[(v) => !!v || '']"
                label="أوافق على الشروط والأحكام"
              ></v-checkbox>

              <v-btn
                class="mb-3 white--text py-6"
                color="primary"
                block
                :loading="loading"
                :disabled="loading"
                @click="register"
              >
                انشاء حساب
              </v-btn>
            </v-form>

            <div class="options d-flex justify-space-between">
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
  name: "Register",

  data: () => ({
    // button loader
    loader: null,
    loading: false,
    checkOtpLoading: false,

    // register form data
    form: {
      name: "",
      email: "",
      phone_number: "",
    },

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

      checkOtpModal: "register/checkOtpModal",
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
      // register action
      registerAction: "register/register",

      // check otp action
      checkOtpAction: "register/checkOtp",

      // close check otp modal
      closeCheckOtpModal: "register/closeCheckOtpModal",
    }),

    // register method
    register() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "loading";
        this.registerAction(this.form);
      }
    },

    // check otp method
    checkOtp() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "checkOtpLoading";
        this.checkOtpAction(this.checkOtpForm);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/auth-page.scss";
</style>
