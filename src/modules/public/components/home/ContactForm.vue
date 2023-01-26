<template>
  <section class="pb-16">
    <v-container style="max-width: 1400px">
      <h1 class="primary--text text-center mb-10 text-h4 font-weight-bold">
        تواصل معنا
      </h1>

      <v-form ref="form" :v-model="valid">
        <v-row>
          <v-col cols="10">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.input_1"
                  :rules="nameRules"
                  label="الاسم الاول"
                  outlined
                  hide-details="true"
                  color="primary"
                  background-color="white"
                  class="input rounded-lg text-subtitle-1"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.input_2"
                  :rules="nameRules"
                  label="الاسم الاخير"
                  outlined
                  hide-details="true"
                  color="primary"
                  background-color="white"
                  class="input rounded-lg text-subtitle-1"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.input_3"
                  :rules="emailRules"
                  label="البريد الالكتروني"
                  type="email"
                  outlined
                  hide-details="true"
                  color="primary"
                  background-color="white"
                  class="input rounded-lg text-subtitle-1"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="form.input_4"
                  :rules="messageRules"
                  label="الرسالة"
                  outlined
                  hide-details="true"
                  color="primary"
                  background-color="white"
                  auto-grow
                  rows="6"
                  class="input rounded-lg text-subtitle-1"
                ></v-textarea>
              </v-col>

              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  color="primary"
                  class="text-capitalize py-6 px-16 text-subtitle-1"
                  @click="sendMessage"
                >
                  ارسال
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="2">
            <div class="social-media d-flex flex-column align-center">
              <v-btn
                color="white"
                class="primary mb-5"
                link
                icon
                large
                aria-label="facebook"
              >
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn
                color="white"
                class="primary mb-5"
                link
                icon
                large
                aria-label="twitter"
              >
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn
                color="white"
                class="primary mb-5"
                link
                icon
                large
                aria-label="instagram"
              >
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn
                color="white"
                class="primary mb-5"
                link
                icon
                large
                aria-label="linkedin"
              >
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
      input_1: "",
      input_2: "",
      input_3: "",
      input_4: "",
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
      handleResponse: "responseHandler/handleResponse",
    }),

    resetFormFields() {
      this.form.input_1 = "";
      this.form.input_2 = "";
      this.form.input_3 = "";
      this.form.input_4 = "";
    },

    async sendMessage() {
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("input_1", this.form.input_1);
        data.append("input_2", this.form.input_2);
        data.append("input_5", this.form.input_3);
        data.append("input_4", this.form.input_4);

        this.axios
          .post(
            `https://blog.secondopinion.sa/wp-json/gf/v2/forms/1/submissions`,
            data
          )
          .then((response) => {
            this.handleResponse(response);
            this.resetFormFields();
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.input {
  .v-label {
    color: #008ad0;
  }
}
</style>
