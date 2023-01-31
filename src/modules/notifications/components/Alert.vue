<template>
  <v-snackbar
    :timeout="-1"
    :value="alert.show"
    :color="alert.color + ' darken-1'"
    bottom
    right
    elevation="10"
    rounded="lg"
    transition="slide-y-transition"
  >
    <span class="subtitle-1 d-block mb-3 font-weight-medium">
      {{ alert.title }}
    </span>
    <p class="body-2 font-weight-regular" v-html="alert.message"></p>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Alert",

  computed: {
    ...mapGetters({
      alert: "notifications/alert",
    }),
  },
};
</script>
