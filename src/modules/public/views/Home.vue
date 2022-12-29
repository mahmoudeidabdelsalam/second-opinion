<template>
  <main class="home">
    <h1 class="mb-5">Home page</h1>
    <v-btn class="primary" link :to="{ name: 'Login' }">Login</v-btn>
    <contact-form />
  </main>
</template>

<script>
export default {
  name: "Home",

  components: {
    ContactForm: () => import("../components/home/ContactForm.vue"),
  },
};
</script>
