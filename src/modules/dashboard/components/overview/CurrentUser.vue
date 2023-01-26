<template>
  <section
    class="current-user white pa-4 rounded-lg text-center"
    style="min-height: 100%"
  >
    <v-avatar class="mx-auto mb-5" size="120">
      <v-img
        src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?auto=format&h=200"
        lazy-src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?auto=format&h=200"
        cover
        alt="doctor"
      ></v-img>
    </v-avatar>

    <span class="d-block subtitle-1 font-weight-bold black--text mb-1">
      {{ user.full_name }}
    </span>
    <span class="d-block subtitle-2 font-weight-bold secondary--text">
      {{ user.email }}
    </span>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CurrentUser",

  computed: {
    ...mapGetters({
      user: "user/userData",
    }),
  },
};
</script>
