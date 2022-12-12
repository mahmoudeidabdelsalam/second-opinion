<template>
  <v-app>
    <v-main>
      <router-view />
      <!-- notification -->
      <notification />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    Notification: () =>
      import("./modules/notifications/components/notification.vue"),
  },
};
</script>
