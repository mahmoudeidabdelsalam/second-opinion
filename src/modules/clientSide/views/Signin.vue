<template>
  <div>
    <ClientHeader/>
    <div class="signin py-15">
      <div class="container">
        <v-row>
          <v-col>
            <h2 class="text-center text-sm-start">تسجيل الدخول</h2>
            <form class="d-flex flex-column">
              <label class="mt-5">رقم الهاتف</label>
              <input
                :rules="rules"
                hide-details="auto"
                class="maininpts pa-2"
              />
              <div class="checkboxs">
                <div class="d-flex">
                  <v-checkbox class="my-0"></v-checkbox>
                  <label class="px-1">تذكرني</label>
                </div>
              </div>
              <v-btn color="primary" class="mt-15 mb-3">تسجيل الدخول</v-btn>
              <div class="text-center">
                <router-link to="/" class="text-decoration-underline">لا أمتلك حساب؟</router-link>
                <span> التسجيل الآن</span>
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
  name: 'Signin',
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