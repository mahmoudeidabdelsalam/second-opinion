<template>
  <div class="landingcontact pb-10">
    <div class="container">
      <h1 class="text-center mb-10">تواصل معنا</h1>
      <v-row class="d-flex">
        <v-col cols="12" sm="11">
          <v-form ref="form" v-model="valid" lazy-validation class="myform text-left">
            <div class="d-flex flex-column flex-sm-row">
              <v-text-field
                v-model="firstname"
                :rules="nameRules"
                label="الاسم الأول"
                class="inpt ms-sm-2 mb-2 mb-sm-0"
                background-color="white"
                outlined
                flat
                dense
                hide-details
                reverse
                >
              </v-text-field>
              <v-text-field
                v-model="lastname"
                :rules="nameRules"
                label="الاسم الأخير"
                class="inpt"
                color="#307ABE"
                background-color="white"
                outlined
                flat
                dense
                hide-details
                reverse
                >
              </v-text-field>
            </div>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="البريد الإلكتروني"
              class="inpt my-2"
              color="#307ABE"
              background-color="white"
              outlined
              flat
              dense
              hide-details
              reverse
            ></v-text-field>
            <v-textarea
              v-model="message"
              :rules="messageRules"
              placeholder="الرسالة"
              class="inpt"
              color="#307ABE"
              background-color="white"
              height="130"
              outlined
              flat
              dense
              hide-details
              reverse
              >
            </v-textarea>
            <v-btn
              :disabled="!valid"
              class="mt-2 px-8 blogContactBtns"
              @click="validate"
            >إرسال</v-btn>
          </v-form>
        </v-col>
        <v-col cols="12" sm="1" class="d-flex justify-center flex-wrap flex-sm-column justify-sm-start align-sm-end">
          <v-icon class="bgcolor pa-1 rounded-circle mx-2 mx-sm-0 mb-4" color="#fff">mdi-facebook</v-icon>
          <v-icon class="bgcolor pa-1 rounded-circle mx-2 mx-sm-0 mb-4" color="#fff">mdi-twitter</v-icon>
          <v-icon class="bgcolor pa-1 rounded-circle mx-2 mx-sm-0 mb-4" color="#fff">mdi-instagram</v-icon>
          <v-icon class="bgcolor pa-1 rounded-circle mx-2 mx-sm-0 mb-4" color="#fff">mdi-linkedin</v-icon>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LandingContact',
    data: () => ({
      valid: true,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      message: '',
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length <= 10) || 'Message must be less than 10 characters',
      ]
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "../style/landing.scss";
.v-text-field--outlined.v-input--has-state fieldset, .v-text-field--outlined.v-input--is-focused fieldset {
  border: 5px solid yellow;
}
</style>