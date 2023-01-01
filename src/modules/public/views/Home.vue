<template>
  <main class="home">
    <v-btn class="primary mb-16" link :to="{ name: 'Login' }">Login</v-btn>
    <search-for-doctor />
    <doctors />
    <mobile-apps />
    <blog />
    <contact-form />
  </main>
</template>

<script>
export default {
  name: "Home",

  components: {
    SearchForDoctor: () => import("../components/home/SearchForDoctor.vue"),
    Doctors: () => import("../components/home/Doctors.vue"),
    MobileApps: () => import("../components/home/MobileApps.vue"),
    Blog: () => import("../components/home/Blog.vue"),
    ContactForm: () => import("../components/home/ContactForm.vue"),
  },
};
</script>
