<template>
  <header>
    <div class="container d-flex justify-space-between py-0">
      <div class="logo d-flex justify-center align-center">
        <img src="src/assets/images/landinglogo.png" alt="TopDoctors"/>
      </div>
      <div class="navitems d-none d-sm-flex justify-center justify-md-end align-center flex-grow-1 px-sm-5">
        <ul class="d-flex">
          <li class="mx-3 mx-md-5"><router-link :to="{name: 'Landing'}">الرئيسية</router-link></li>
          <li class="mx-3 mx-md-5"><router-link to="/">من نحن؟</router-link></li>
          <li class="mx-3 mx-md-5"><router-link to="/">خدماتنا</router-link></li>
          <li class="mx-3 mx-md-5"><router-link :to="{name: 'AllDoctors'}">أطبائنا</router-link></li>
          <li class="mx-3 mx-md-5"><router-link :to="{name: 'Blog'}">المدونة</router-link></li>
        </ul>
      </div>
      <div class="btns d-none d-md-flex align-center me-2 my-auto">
        <v-btn class="loginbtn mx-1" outlined link :to="{name: 'Signin'}">تسجيل الدخول</v-btn>
        <v-btn class="registerbtn mx-1" link :to="{name: 'Register'}">التسجيل</v-btn>
      </div>
      <v-icon class="me-5 my-auto d-block d-md-none" @click="secondaryNav">mdi-menu</v-icon>
    </div>
    <div :class="`btns d-flex flex-column justify-start align-start flex-sm-row justify-sm-center align-sm-center d-md-none py-15 py-sm-1 px-3 ${isshow&&'show'}`">
      <div class="navitems d-flex d-sm-none justify-center justify-md-start align-center px-sm-5">
        <ul class="d-flex flex-column d-sm-none">
          <li class="mb-3"><router-link :to="{name: 'Landing'}">الرئيسية</router-link></li>
          <li class="mb-3"><router-link to="/">من نحن؟</router-link></li>
          <li class="mb-3"><router-link to="/">خدماتنا</router-link></li>
          <li class="mb-3"><router-link :to="{name: 'AllDoctors'}">أطبائنا</router-link></li>
          <li class="mb-3"><router-link :to="{name: 'Blog'}">المدونة</router-link></li>
        </ul>
      </div>
      <v-btn class="registerbtn mb-2 mb-sm-0 mx-sm-1" link :to="{name: 'Register'}">التسجيل</v-btn>
      <v-btn class="loginbtn mx-sm-1" outlined link :to="{name: 'Signin'}">تسجيل الدخول</v-btn>
    </div>
  </header>
</template>

<script>

export default {
  data() {
    return {
      isshow: false
    }
  },
  methods: {
    secondaryNav: function(){
      this.isshow = !this.isshow
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/header.scss";
</style>