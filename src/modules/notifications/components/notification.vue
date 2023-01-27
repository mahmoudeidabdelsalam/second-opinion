<template>
  <v-snackbar
    :timeout="-1"
    :value="notification.show"
    bottom
    right
    :color="notification.color + ' darken-1'"
    elevation="10"
  >
    {{ notification.message }}
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "notification",

  computed: {
    ...mapGetters({
      notification: "notifications/notification",
    }),
  },
};
</script>

<style></style>
