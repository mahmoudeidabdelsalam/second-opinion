<template>
  <main class="home">
    <h1 class="mb-5">Home page</h1>
    <v-btn class="primary" link :to="{ name: 'Login' }">Login</v-btn>
    <mobile-apps />
    <blog />
    <contact-form />
  </main>
</template>

<script>
export default {
  name: "Home",

  components: {
    MobileApps: () => import("../components/home/MobileApps.vue"),
    Blog: () => import("../components/home/Blog.vue"),
    ContactForm: () => import("../components/home/ContactForm.vue"),
  },
};
</script>
