<template>
  <section class="mb-16">
    <v-container fluid>
      <h1 class="primary--text text-center mb-10">Contact us</h1>

      <v-form
        ref="form"
        :v-model="valid"
        lazy-validation
        class="mx-auto"
        style="max-width: 1000px"
      >
        <v-row>
          <v-col cols="10">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.first_name"
                  :rules="nameRules"
                  label="First name"
                  outlined
                  dense
                  class="rounded-lg"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.last_name"
                  :rules="nameRules"
                  label="Last name"
                  outlined
                  dense
                  class="rounded-lg"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  label="Email"
                  type="email"
                  outlined
                  dense
                  class="rounded-lg"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="form.message"
                  :rules="messageRules"
                  label="Message"
                  outlined
                  dense
                  auto-grow
                  rows="6"
                  class="rounded-lg"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-btn
                  color="primary"
                  class="text-capitalize px-16"
                  @click="sendMessage"
                >
                  Send
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="2">
            <div class="social-media d-flex flex-column align-center">
              <v-btn color="white" class="primary mb-5" link icon large>
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn color="white" class="primary mb-5" link icon large>
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn color="white" class="primary mb-5" link icon large>
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn color="white" class="primary mb-5" link icon large>
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ContactForm",

  data: () => ({
    form: {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      emailRules: "validationRules/emailRules",
      messageRules: "validationRules/messageRules",
    }),
  },

  methods: {
    ...mapActions({
      sendMessageAction: "contactUs/sendMessage",
    }),

    async sendMessage() {
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("first_name", this.form.first_name);
        data.append("last_name", this.form.last_name);
        data.append("email", this.form.email);
        data.append("message", this.form.message);

        this.sendMessageAction({
          url: "dashboard/roles",
          data: data,
        }).then((res) => {
          console.log(res);
          this.desserts.unshift(res);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.v-input {
  fieldset {
    border: 2px solid #3e7ab1;
  }
}
</style>
