<template>
  <main class="home" style="background-color: #f8fbff">
    <doctors-carusel />
    <search-for-doctor :doctors="doctors" />
    <departments />
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
    Departments: () => import("../components/home/Departments.vue"),
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
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      // get doctors
      this.axios
        .get(`patient/doctors`)
        .then((response) => {
          this.doctors = response.data.data;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>
