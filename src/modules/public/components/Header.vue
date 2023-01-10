<template>
  <nav class="d-flex justify-space-around align-center" style="width: 100%">
    <router-link :to="{ name: 'Home' }" class="brand d-block pa-5 text-center">
      <img src="../../../assets/images/logo.webp" alt="Top Doctors logo" />
    </router-link>

    <div class="links">
      <v-tabs>
        <v-tab class="font-weight-bold" link :to="{ name: 'Home' }">Home</v-tab>
        <v-tab class="font-weight-bold" link :to="{ name: 'PublicAbout' }">
          About us
        </v-tab>
        <v-tab class="font-weight-bold" link :to="{ name: 'PublicServices' }">
          Services
        </v-tab>
        <v-tab class="font-weight-bold" link :to="{ name: 'PublicDoctors' }">
          Doctors
        </v-tab>
        <v-tab class="font-weight-bold" link :to="{ name: 'PublicBlog' }">
          Blog
        </v-tab>
      </v-tabs>
    </div>

    <div>
      <!-- translations -->
      <v-menu offset-y open-on-hover min-width="150">
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
      </v-menu>

      <!-- profile -->
      <v-menu offset-y open-on-hover>
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
      </v-menu>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DashboardHeader",

  methods: {
    // map translate action
    ...mapActions({
      // translate action
      translateAction: "translate/setSystemLanguage",
      // change direction action
      changeDirectionAction: "translate/setSystemDirection",
      // logout
      logoutAction: "logout/logout",
    }),

    // translate method
    translate(lang) {
      // call translate action
      this.translateAction(lang);
      // call change direction action
      this.changeDirectionAction(lang === "ar" ? "rtl" : "ltr");
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
.brand {
  img {
    width: 80px;
    height: auto;
    object-fit: cover;
  }
}
</style>
