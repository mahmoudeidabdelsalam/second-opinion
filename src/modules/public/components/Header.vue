<template>
  <nav>
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

    <!-- notifications -->
    <v-menu offset-y open-on-hover min-width="300">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="black" aria-label="bell" v-bind="attrs" v-on="on">
          <span class="notification-dot info"></span>
          <v-icon> mdi-bell-outline </v-icon>
        </v-btn>
      </template>
      <v-list three-line>
        <template>
          <v-subheader>الاشعارات</v-subheader>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Birthday gift</v-list-item-title>
              <v-list-item-subtitle>
                Trevor Hansen — Have any ideas about what we should get Heidi
                for her birthday?
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
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
        <!-- <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>الاعدادات</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

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

<style></style>
