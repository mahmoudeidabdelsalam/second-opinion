<template>
  <div class="auth-page d-flex justify-center align-center">
    <div class="main-box rounded-lg elevation-24">
      <v-row>
        <v-col cols="12" md="6">
          <div class="content d-flex flex-column align-center white rounded-lg">
            <router-link
              class="font-weight-black text-h4 mb-5"
              :to="{ name: 'Home' }"
            >
              Second opinion
            </router-link>

            <p class="font-weight-regular text--secondary text-center mb-4">
              Please enter your email and password to login.
            </p>

            <v-form ref="form" :v-model="valid" lazy-validation>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                type="email"
                label="Email"
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                type="password"
                label="Password"
                outlined
                dense
                @keydown.enter="login"
              ></v-text-field>

              <v-btn
                class="mb-3"
                color="primary"
                block
                :disabled="!valid"
                @click="login"
              >
                Login
              </v-btn>
            </v-form>

            <div class="options d-flex justify-space-between">
              <v-btn
                class="text-capitalize"
                color="primary"
                text
                link
                :to="{ name: 'Register' }"
              >
                Register
              </v-btn>

              <v-btn class="text-capitalize" color="primary" text link to="/">
                Forget password?
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="image">
            <img src="@/assets/images/doctor.webp" alt="Login image" />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data: () => ({
    // login form data
    form: {
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
      // login action
      loginAction: "login/login",
    }),
    // login method
    login() {
      // validate form
      if (this.$refs.form.validate()) {
        this.loginAction(this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/auth-page.scss";
</style>
