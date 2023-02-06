<template>
  <section class="mb-16 mx-auto">
    <v-container style="max-width: 1180px">
      <v-tabs
        v-model="tabs"
        class="main-tabs rounded-lg rounded-bl-0 rounded-br-0 elevation-3"
        style="max-width: max-content"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          href="#mobile-tabs-5-1"
          class="font-weight-bold px-10"
          active-class="primary--text active-tab"
        >
          الطبيب
        </v-tab>

        <v-tab
          href="#mobile-tabs-5-2"
          class="font-weight-bold px-10"
          active-class="primary--text active-tab"
        >
          التخصص
        </v-tab>
      </v-tabs>

      <v-tabs-items
        v-model="tabs"
        class="pa-5 mb-10 rounded-lg rounded-tl-0 rounded-tr-0 elevation-3"
      >
        <v-tab-item value="mobile-tabs-5-1">
          <v-card flat>
            <v-form ref="form" :v-model="valid" style="max-width: 909px">
              <v-row>
                <v-col cols="12" md="10">
                  <v-autocomplete
                    v-model="doctor_name"
                    :items="
                      doctors.map((item) => {
                        return {
                          text: item.full_name,
                          value: item.full_name,
                        };
                      })
                    "
                    label="بحث بالطبيب"
                    :loading="doctorsLoading"
                    outlined
                    hide-details="true"
                    color="primary"
                    background-color="#ecf6fc"
                    class="rounded-lg"
                    @update:search-input="getDoctor($event)"
                    @keydown.enter.prevent
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="primary"
                    class="text-capitalize rounded-lg py-7 font-weight-bold"
                    block
                    @click="doctorSearch"
                  >
                    بحث
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-tab-item>

        <v-tab-item value="mobile-tabs-5-2">
          <v-card flat>
            <v-form ref="form" :v-model="valid" style="max-width: 909px">
              <v-row>
                <v-col cols="12" md="10">
                  <v-autocomplete
                    v-model="department_id"
                    :items="departments"
                    label="بحث بالتخصص"
                    outlined
                    hide-details="true"
                    color="primary"
                    background-color="#ecf6fc"
                    class="rounded-lg"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="primary"
                    class="text-capitalize rounded-lg py-7 font-weight-bold"
                    block
                    @click="departmentSearch"
                  >
                    بحث
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

      <div
        class="departments-tags mx-auto text-center"
        style="max-width: 1000px; min-height: 128px"
      >
        <v-btn
          v-for="department in departments.slice(0, 9)"
          :key="department.value"
          class="primary rounded-lg py-7 ma-1 text-subtitle-1 font-weight-medium"
          link
          :to="{
            name: 'PublicDoctors',
            query: { department_id: department.value },
          }"
        >
          {{ department.text }}
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SearchForDoctor",

  data: () => ({
    tabs: null,

    // form
    doctor_name: "",
    department_id: "",

    // doctors
    doctors: [],
    doctorsLoading: false,

    // departments
    departments: [],
  }),

  created() {
    // init data
    this.initData();
  },

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
    }),
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      // get departments
      this.axios
        .get(`patient/departments`)
        .then((response) => {
          this.departments = response.data.data.map((item) => {
            return {
              text: item.name,
              value: item.id,
            };
          });
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },

    // get doctor
    getDoctor(event) {
      // show loading
      this.doctorsLoading = true;

      this.axios
        .get(`patient/doctors?search=${event ? event : ""}`)
        .then((response) => {
          this.doctors = response.data.data;

          // hide loading
          this.doctorsLoading = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);

          // hide loading
          this.doctorsLoading = false;
        });
    },

    // doctor search
    doctorSearch() {
      // if not empty
      if (this.doctor_name) {
        this.$router.push({
          name: "PublicDoctors",
          query: {
            doctor_name: this.doctor_name,
          },
        });
      }
    },

    // department search
    departmentSearch() {
      // if not empty
      if (this.department_id) {
        this.$router.push({
          name: "PublicDoctors",
          query: {
            department_id: this.department_id,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.main-tabs {
  .v-tabs-slider {
    color: transparent !important;
  }

  .active-tab {
    box-shadow: 0px 1px 20px rgba(48, 122, 190, 0.1);
  }
}
</style>
