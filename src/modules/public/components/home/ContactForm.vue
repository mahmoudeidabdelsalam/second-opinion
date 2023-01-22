<template>
  <section class="pb-16">
    <v-container style="max-width: 1400px">
      <h1 class="primary--text text-center mb-10 text-h4 font-weight-bold">
        تواصل معنا
      </h1>

      <v-form ref="form" :v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="11">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.first_name"
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
                  v-model="form.last_name"
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
                  v-model="form.email"
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
                  v-model="form.message"
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

          <v-col cols="1">
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
.input {
  .v-label {
    color: #008ad0;
  }
}
</style>
