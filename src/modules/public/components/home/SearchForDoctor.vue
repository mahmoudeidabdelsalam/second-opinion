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
          {{ $t("message") }}
        </v-tab>

        <v-tab
          href="#mobile-tabs-5-2"
          class="font-weight-bold"
          active-class="primary--text active-tab"
        >
          Specialization
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
                  <v-text-field
                    v-model="search.doctor_name"
                    :rules="nameRules"
                    label="Search for doctor"
                    outlined
                    class="rounded-lg"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="primary"
                    class="text-capitalize rounded-lg py-7 font-weight-bold"
                    block
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
                    v-model="search.specialization"
                    :rules="selectRules"
                    label="Search for specialization"
                    outlined
                    class="rounded-lg"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="primary"
                    class="text-capitalize rounded-lg py-7 font-weight-bold"
                    block
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
import { mapGetters } from "vuex";

export default {
  name: "SearchForDoctor",

  data: () => ({
    tabs: null,
    search: {
      doctor_name: "",
      specialization: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      selectRules: "validationRules/selectRules",
    }),
  },
};
</script>

<style lang="scss" scoped>
.v-tabs-slider {
  color: transparent !important;
}
</style>
