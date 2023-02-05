<template>
  <section class="doctor-login-form">
    <v-form ref="form" :v-model="valid">
      <v-text-field
        v-model="loginForm.email"
        :rules="emailRules"
        label="ادخل البريد الالكتروني"
        outlined
        autofocus
      ></v-text-field>

      <v-text-field
        v-model="loginForm.password"
        :rules="passwordRules"
        type="password"
        label="كلمة المرور"
        outlined
        @keydown.enter="login"
      ></v-text-field>

      <!-- remember me -->
      <v-checkbox label="تذكرني"></v-checkbox>

      <v-btn
        class="mb-3 white--text py-6"
        color="primary"
        block
        :loading="loading1"
        :disabled="loading1"
        @click="login"
      >
        تسجيل الدخول
      </v-btn>
    </v-form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DoctorLoginForm",

  data: () => ({
    // buttons loading
    loading1: false,

    // login form
    loginForm: {
      email: "",
      password: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      emailRules: "validationRules/emailRules",
      passwordRules: "validationRules/passwordRules",
    }),
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
      attemptLogin: "login/attemptLogin",
    }),

    // login method
    login() {
      // validate form
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("email", this.loginForm.email);
        data.append("password", this.loginForm.password);

        // show loading1
        this.loading1 = true;

        this.axios
          .post(`auth/login`, data)
          .then((response) => {
            // attempt login
            this.attemptLogin(response.data.data.token);
            this.handleResponse(response);
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide loading1
            this.loading1 = false;
          });
      }
    },
  },
};
</script>
