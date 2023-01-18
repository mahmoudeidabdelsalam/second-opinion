<template>
  <section class="mb-16 mx-auto">
    <v-container style="max-width: 1400px">
      <v-tabs
        v-model="tabs"
        class="rounded-lg rounded-bl-0 rounded-br-0 elevation-3"
        style="max-width: max-content"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          href="#mobile-tabs-5-1"
          class="font-weight-bold"
          active-class="primary--text active-tab"
        >
          الطبيب
        </v-tab>

        <v-tab
          href="#mobile-tabs-5-2"
          class="font-weight-bold"
          active-class="primary--text active-tab"
        >
          التخصص
        </v-tab>
      </v-tabs>

      <v-tabs-items
        v-model="tabs"
        class="pa-5 rounded-lg rounded-tl-0 rounded-tr-0 elevation-3"
      >
        <v-tab-item value="mobile-tabs-5-1">
          <v-card flat>
            <v-form ref="form" :v-model="valid" lazy-validation>
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
                    outlined
                    class="rounded-lg"
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
            <v-form ref="form" :v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="10">
                  <v-autocomplete
                    v-model="department_id"
                    :items="departments"
                    label="بحث بالتخصص"
                    outlined
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

    // departments
    departments: [],
  }),

  props: {
    doctors: {
      type: Array,
      default: () => [],
    },
  },

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
      getData: "crudOperations/getData",
    }),

    // init data
    initData() {
      // get departments
      this.getData("patient/departments").then((res) => {
        this.departments = res.map((item) => {
          return {
            text: item.name,
            value: item.id,
          };
        });
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

<style lang="scss" scoped>
.v-tabs-slider {
  color: transparent !important;
}
</style>
