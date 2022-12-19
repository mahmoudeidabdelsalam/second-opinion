<template>
  <main class="pa-10 text-center">
    <h1 class="mb-5">Home page</h1>
    <v-btn class="primary" link :to="{ name: 'Login' }">Login</v-btn>
  </main>
</template>

<script>
export default {
  name: "Home",
};
</script>
