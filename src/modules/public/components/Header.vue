<template>
  <nav class="d-flex justify-space-around align-center" style="width: 100%">
    <router-link :to="{ name: 'Home' }" class="brand d-block pa-5 text-center">
      <img src="../../../assets/images/logo.webp" alt="Top Doctors logo" />
    </router-link>

    <div class="links hidden-md-and-down">
      <v-tabs>
        <v-tabs-slider></v-tabs-slider>

        <v-tab class="font-weight-bold primary--text" link to="/">
          الرئيسية
        </v-tab>
        <v-tab
          class="font-weight-bold primary--text"
          link
          :to="{ name: 'PublicAbout' }"
        >
          من نحن؟
        </v-tab>
        <v-tab
          class="font-weight-bold primary--text"
          link
          :to="{ name: 'PublicServices' }"
        >
          خدماتنا
        </v-tab>
        <v-tab
          class="font-weight-bold primary--text"
          link
          :to="{ name: 'PublicDoctors' }"
        >
          اطبائنا
        </v-tab>
        <v-tab
          class="font-weight-bold primary--text"
          link
          href="https://blog.secondopinion.sa"
        >
          المدونة
        </v-tab>
      </v-tabs>
    </div>

    <div>
      <!-- translations -->
      <!-- <v-menu offset-y open-on-hover min-width="150">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="black" aria-label="bell" v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="translate('ar')">
            <v-list-item-content>
              <v-list-item-title>العربية</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="translate('en')">
            <v-list-item-content>
              <v-list-item-title>English</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> -->

      <!-- profile -->
      <!-- <v-menu offset-y open-on-hover v-if="authenticated">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="black" aria-label="user" v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>تسجيل الخروج</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> -->

      <v-btn
        depressed
        link
        :to="{
          name:
            authenticated.role.value == 4
              ? 'ClientNotifications'
              : 'DashboardOverview',
        }"
        class="primary rounded-lg text-capitalize px-6 mx-2"
        v-if="authenticated"
      >
        {{ authenticated.role.value == 4 ? "الصفحة الشخصية" : "لوحة التحكم" }}
      </v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            class="white primary--text rounded-lg text-capitalize px-6 mx-2"
            style="border: 1px solid #3c87cd !important"
            v-if="!authenticated"
          >
            تسجيل الدخول
          </v-btn>
        </template>
        <v-list>
          <v-list-item link :to="{ name: 'DoctorLogin' }">
            <v-list-item-title class="font-weight-regular">
              تسجيل الدخول للطبيب
            </v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ name: 'Login' }">
            <v-list-item-title class="font-weight-regular">
              تسجيل الدخول للمريض
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        depressed
        link
        :to="{ name: 'Register' }"
        class="primary rounded-lg text-capitalize px-6 mx-2 hidden-md-and-down"
        style="border: 1px solid #3c87cd !important"
        v-if="!authenticated"
      >
        التسجيل
      </v-btn>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashboardHeader",

  computed: {
    ...mapGetters({
      authenticated: "user/authenticated",
    }),
  },

  methods: {
    // map translate action
    ...mapActions({
      // translate action
      translateAction: "translate/setSystemLanguage",
    }),

    // translate method
    translate(lang) {
      // call translate action
      this.translateAction(lang);
    },

    // logout method
    logout() {
      // call loogut action
      this.logoutAction();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-tabs-slider {
  color: transparent !important;
}

.brand {
  img {
    width: 80px;
    height: auto;
    object-fit: cover;
  }
}
</style>
