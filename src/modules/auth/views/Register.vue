<template>
  <div class="auth-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6" class="pa-0">
          <div
            class="form-side d-flex flex-column justify-center align-start mx-auto pa-5"
          >
            <h1 class="mb-7">انشاء حساب</h1>

            <v-form ref="form" :v-model="valid" lazy-validation>
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

              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                type="password"
                label="كلمة المرور"
                outlined
                dense
                @keydown.enter="register"
              ></v-text-field>

              <v-text-field
                v-model="form.password_confirmation"
                :rules="[
                  ...confirmPasswordRules,
                  (v) => v === form.password || 'كلمة المرور غير متطابقة',
                ]"
                type="password"
                label="تأكيد كلمة المرور"
                outlined
                dense
                @keydown.enter="register"
              ></v-text-field>

              <!-- accept terms and conditions -->
              <v-checkbox
                v-model="form.acceptTerms"
                :rules="[(v) => !!v || '']"
                label="أوافق على الشروط والأحكام"
              ></v-checkbox>

              <v-btn
                class="mb-3 white--text"
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
  name: "Register",

  data: () => ({
    // button loader
    loader: null,
    loading: false,
    // register form data
    form: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      passwordRules: "validationRules/passwordRules",
      confirmPasswordRules: "validationRules/confirmPasswordRules",
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
    }),

    // register method
    register() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loader = "loading";
        this.registerAction(this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/auth-page.scss";
</style>
