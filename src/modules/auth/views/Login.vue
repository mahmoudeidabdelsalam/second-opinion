<template>
  <div class="auth-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6" class="pa-0">
          <div
            class="form-side d-flex flex-column justify-center align-start mx-auto pa-5"
          >
            <h1 class="mb-7">تسجيل الدخول</h1>

            <v-form ref="form" :v-model="valid" lazy-validation>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                type="email"
                label="البريد الإلكتروني"
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                type="password"
                label="كلمة المرور"
                outlined
                dense
                @keydown.enter="login"
              ></v-text-field>

              <!-- remember me -->
              <v-checkbox v-model="form.rememberMe" label="تذكرني"></v-checkbox>

              <v-btn
                class="mb-3 white--text"
                color="primary"
                block
                :disabled="!valid"
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
                @click.stop="forgetPasswordDialog = true"
              >
                نسيت كلمة المرور؟
              </v-btn>
              <!-- forgot password dialog -->
              <v-dialog v-model="forgetPasswordDialog" max-width="400">
                <v-card>
                  <v-card-title class="text-h6 mb-5">
                    هل نسيت كلمة المرور؟
                  </v-card-title>

                  <v-card-text>
                    <v-form ref="form" :v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="forget.username"
                        :rules="phoneOrEmailRules"
                        label="ادخل رقم الهاتف او البريد الالكتروني"
                        outlined
                        dense
                      ></v-text-field>

                      <v-btn
                        class="mt-3 white--text"
                        color="primary"
                        block
                        :loading="loading"
                        :disabled="loading"
                        @click="forgetPassword"
                      >
                        استرداد الحساب
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <!-- otp dialog -->
              <v-dialog v-model="otpDialog" max-width="400">
                <v-card>
                  <v-card-title class="text-h6"> التحقق من OTP </v-card-title>

                  <v-card-text>
                    <span class="d-block body-2 mb-7">
                      برجاء ادخال الكود المرسل على رقم الهاتف
                    </span>
                    <v-form ref="form" :v-model="valid" lazy-validation>
                      <v-otp-input
                        length="4"
                        v-model="otp_form.code"
                        autofocus
                        style="direction: ltr"
                      ></v-otp-input>

                      <v-btn
                        class="mt-3 white--text"
                        color="primary"
                        block
                        :loading="loading"
                        :disabled="loading"
                        @click="checkOtp"
                      >
                        تحقق
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
    // button loader
    loader: null,
    loading: false,
    // login form data
    form: {
      email: "",
      password: "",
    },
    // forget password dialog
    forgetPasswordDialog: false,
    // forget password form data
    forget: {
      username: "",
    },
    // otp dialog
    otpDialog: false,
    // otp code
    otp_form: {
      code: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      emailRules: "validationRules/emailRules",
      passwordRules: "validationRules/passwordRules",
      phoneOrEmailRules: "validationRules/phoneOrEmailRules",
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
      // forget password action
      forgetPasswordAction: "forget/forgetPassword",
      // check otp action
      checkOtpAction: "forget/checkOtp",
    }),

    // login method
    login() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loginAction(this.form);
      }
    },

    // forget password method
    forgetPassword() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "loading";
        this.forgetPasswordAction(this.forget).then(() => {
          this.forgetPasswordDialog = false;
          this.otpDialog = true;
        });
      }
    },

    // check otp method
    checkOtp() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "loading";
        this.checkOtpAction({
          code: this.otp_form.code,
          username: this.forget.username,
        }).then((res) => {
          alert(res);
          this.otpDialog = false;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/auth-page.scss";
</style>
