<template>
  <main class="home" style="background-color: #f8fbff">
    <doctors-carusel />
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
    DoctorsCarusel: () => import("../components/home/DoctorsCarusel.vue"),
    SearchForDoctor: () => import("../components/home/SearchForDoctor.vue"),
    Doctors: () => import("../components/home/Doctors.vue"),
    MobileApps: () => import("../components/home/MobileApps.vue"),
    Blog: () => import("../components/home/Blog.vue"),
    ContactForm: () => import("../components/home/ContactForm.vue"),
  },
};
</script>
