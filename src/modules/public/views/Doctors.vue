<template>
  <main class="doctors">
    <div class="bg mb-5 d-flex align-center">
      <v-container style="max-width: 1400px">
        <span class="white--text text-h5 font-weight-bold">
          احجز مع أفضل الأطباء في المملكة
        </span>
      </v-container>
    </div>

    <div class="list mb-5 mx-auto">
      <v-container style="max-width: 1400px">
        <v-row v-if="doctors.length">
          <v-col cols="12" md="6" v-for="doctor in doctors" :key="doctor.id">
            <div
              class="doctor primary pa-5 rounded-lg d-flex flex-column flex-md-row justify-start align-start"
              style="min-height: 224px"
            >
              <v-avatar class="rounded-lg mb-4" size="150">
                <v-img
                  :src="doctor.profile"
                  :lazy-src="doctor.profile"
                  cover
                  max-height="150"
                  max-width="150"
                  alt="article"
                ></v-img>
              </v-avatar>

              <div class="doctor-info mx-0 mx-md-4">
                <span class="d-block mb-2 white--text font-weight-bold text-h6">
                  {{ doctor.full_name }}
                </span>
                <span class="d-block mb-2 white--text">
                  {{ doctor.department.name }}
                </span>
                <p
                  class="white--text body-2 description"
                  style="max-height: 60px"
                >
                  {{ doctor.description }}
                </p>
                <v-btn
                  class="white rounded-lg text-capitalize primary--text font-weight-bold"
                  depressed
                  link
                  :to="{
                    name: 'PublicDoctorsProfile',
                    params: { id: doctor.slug },
                  }"
                >
                  طلب استشارة
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- waiting for data -->
        <v-row v-else>
          <v-col cols="12" md="6">
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="load-more text-center mb-10" v-if="showLoadMore">
      <v-btn
        class="primary py-6 px-16 rounded-lg"
        :loading="loadMore"
        :disabled="loadMore"
        @click="initData()"
      >
        المزيد
        <template v-slot:loader>
          <span>تحميل ...</span>
        </template>
      </v-btn>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Doctors",

  data: () => ({
    // doctors
    doctors: [],

    // pageNumber
    pageNumber: 1,

    // load more
    loadMore: false,

    // show load more
    showLoadMore: true,
  }),

  created() {
    // init data
    this.initData(this.pageNumber);
  },

  watch: {
    $route() {
      // init data
      this.initData(this.pageNumber);
    },
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      // set load more
      this.loadMore = true;

      // get doctors
      this.axios
        .get(
          `patient/${
            this.$route.query.doctor_name
              ? `doctors?search=${this.$route.query.doctor_name}`
              : this.$route.query.department_id
              ? `doctors?department_id=${this.$route.query.department_id}`
              : `doctors?page=${this.pageNumber++}`
          }`
        )
        .then((response) => {
          if (response.data.data.length) {
            // concat doctors
            this.doctors = this.doctors.concat(response.data.data);
          } else {
            this.showLoadMore = false;
          }

          // stop load more
          this.loadMore = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/doctors.scss";
</style>
