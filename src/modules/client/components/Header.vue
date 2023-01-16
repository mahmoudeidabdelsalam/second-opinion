<template>
  <nav class="d-flex justify-space-around align-center" style="width: 100%">
    <div class="links">
      <v-tabs>
        <v-tabs-slider></v-tabs-slider>

        <v-tab class="font-weight-bold" link to="/">Home</v-tab>
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
        {{ authenticated.role.value == 4 ? "Profile" : "Dashboard" }}
      </v-btn>

      <v-btn
        depressed
        @click="logout"
        class="primary rounded-lg text-capitalize px-6 mx-2"
        v-if="authenticated"
      >
        Logout
      </v-btn>

      <v-btn
        depressed
        link
        :to="{ name: 'Login' }"
        class="primary rounded-lg text-capitalize px-6 mx-2"
        v-if="!authenticated"
      >
        Login
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
      // logout
      logoutAction: "logout/logout",
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
</style>
