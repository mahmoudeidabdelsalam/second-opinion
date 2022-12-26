<template>
  <div>
    <ClientHeader/>
    <div class="register py-10">
      <div class="container">
        <v-row>
          <v-col>
            <h2 class="text-center text-sm-start">انشاء حساب</h2>
            <form class="d-flex flex-column">
              <label class="mt-5">الاسم</label>
              <input
                :rules="rules"
                hide-details="auto"
                class="mt-0 maininpts pa-2"
              />
              <label class="mt-5">رقم الهاتف</label>
              <input
                :rules="rules"
                hide-details="auto"
                class="mt-0 maininpts pa-2"
              />
              <div class="checkboxs">
                <div class="d-flex">
                  <v-checkbox class="my-0"></v-checkbox>
                  <label class="px-1">تذكرني</label>
                </div>
                <div class="d-flex">
                  <v-checkbox class="my-0"></v-checkbox>
                  <label class="px-1">
                    <span>اوافق علي&nbsp;</span>
                    <router-link to="/" class="text-decoration-underline">الشروط والأحكام</router-link>
                  </label>
                </div>
              </div>
              <v-btn color="primary" class="mt-5 mb-3">انشاء حساب</v-btn>
              <div class="text-center">
                <router-link to="/" class="text-decoration-underline">أمتلك حساب؟</router-link>
                <span> تسجيل الدخول</span>
              </div>
            </form>
          </v-col>
          <v-col class="d-none d-sm-block">
            <div class="imgcolumn">
              <img src="src/assets/images/Dr-woman.png"/>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <ClientFooter/>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {
    ClientHeader: () =>
      import("../components/Header.vue"),
    ClientFooter: () =>
      import("../components/Footer.vue"),
  },
  data() {
    return {
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      checkbox: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/register.scss";
</style>