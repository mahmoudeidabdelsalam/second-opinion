<template>
  <main>
    <h1>Home</h1>
    <v-btn class="primary" link :to="{ name: 'Login' }">Login</v-btn>
  </main>
</template>

<script>
export default {
  name: "Home",
};
</script>
