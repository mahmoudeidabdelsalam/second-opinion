<template>
  <div class="auth-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6" class="pa-0">
          <div
            class="form-side d-flex flex-column justify-center align-start mx-auto pa-5"
          >
            <h1 class="mb-7">Create new account</h1>

            <v-form ref="form" :v-model="valid" lazy-validation>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                type="email"
                label="Email or phone number"
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
                @keydown.enter="register"
              ></v-text-field>

              <v-btn
                class="mb-3"
                color="primary"
                block
                :disabled="!valid"
                @click="register"
              >
                Register
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
                Login
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="pa-0 hidden-sm-and-down">
          <div class="image-side">
            <div class="image">
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
    // register form data
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
      // register action
      registerAction: "register/register",
    }),

    // register method
    register() {
      // validate form
      if (this.$refs.form.validate()) {
        this.registerAction(this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/auth-page.scss";
</style>
