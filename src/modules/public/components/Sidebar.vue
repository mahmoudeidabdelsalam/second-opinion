<template>
  <aside class="sidebar white">
    <router-link :to="{ name: 'Home' }" class="brand d-block pa-5 text-center">
      <img src="../../../assets/images/logo.webp" alt="Top Doctors logo" />
    </router-link>

    <span class="d-block pa-5 font-weight-medium black--text">القائمة</span>

    <v-list>
      <v-list-item link to="/" active-class="primary--text">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            الرئيسية
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'PublicAbout' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            من نحن؟
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'PublicServices' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-hand-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            خدماتنا
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        :to="{ name: 'PublicDoctors' }"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-doctor</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            اطبائنا
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        link
        href="https://blog.secondopinion.sa"
        active-class="primary--text"
      >
        <v-list-item-icon>
          <v-icon>mdi-post-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            المدونة
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="scss" scoped>
@import "../style/sidebar.scss";
</style>
