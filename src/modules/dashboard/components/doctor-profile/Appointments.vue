<template>
  <v-card flat>
    <span class="d-block primary--text text-h6 font-weight-bold mb-5">
      مواعيد العمل
    </span>

    <v-form
      ref="form"
      :v-model="valid"
      lazy-validation
      style="max-width: 600px"
    >
      <v-container>
        <v-row v-for="(day, index) in weekDays" :key="index">
          <v-col cols="12">
            <div class="day-box d-flex justify-space-between align-center">
              <span class="font-weight-bold secondary--text">
                {{ day.name }}
              </span>
              <v-switch v-model="day.value" inset></v-switch>
            </div>
            <div
              class="appointment-box pa-5 rounded-lg primary_bg"
              v-if="day.value"
            >
              <v-row>
                <v-col cols="12" md="6">
                  <!-- date picker -->
                  <v-menu
                    ref="menuFrom"
                    v-model="menuFrom"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="form.from"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.from"
                        label="من"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menuFrom"
                      v-model="form.from"
                      full-width
                      @click:minute="$refs.menuFrom.save(form.from)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="6">
                  <!-- date picker -->
                  <v-menu
                    ref="menuTo"
                    v-model="menuTo"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="form.to"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.to"
                        label="الى"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menuTo"
                      v-model="form.to"
                      full-width
                      @click:minute="$refs.menuTo.save(form.to)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.duration"
                    :rules="numberRules"
                    type="number"
                    label="مدة الكشف (بالدقائق)"
                    prepend-icon="mdi-clock-time-four-outline"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Appointments",

  data: () => ({
    // week days array
    weekDays: [
      { name: "السبت", value: "saturday" },
      { name: "الأحد", value: "sunday" },
      { name: "الاثنين", value: "monday" },
      { name: "الثلاثاء", value: "tuesday" },
      { name: "الأربعاء", value: "wednesday" },
      { name: "الخميس", value: "thursday" },
      { name: "الجمعة", value: "friday" },
    ],

    // form data
    form: {
      saturday: false,
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,

      from: "",
      to: "",
      duration: "",
    },

    // date picker
    menuFrom: false,
    menuTo: false,
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      numberRules: "validationRules/numberRules",
    }),
  },
};
</script>

<style></style>
