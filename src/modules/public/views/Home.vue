<template>
  <main class="home" style="background-color: #f8fbff">
    <doctors-carusel :doctors="doctors" />
    <search-for-doctor :doctors="doctors" />
    <doctors :doctors="doctors" />
    <mobile-apps />
    <blog />
    <contact-form />
  </main>
</template>

<script>
import { mapActions } from "vuex";

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

  data: () => ({
    // doctors
    doctors: [],
  }),

  created() {
    // init data
    this.initData();
  },

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
    }),

    // init data
    initData() {
      // get doctors
      this.getData(`patient/doctors`).then((res) => {
        this.doctors = res;
      });
    },
  },
};
</script>
