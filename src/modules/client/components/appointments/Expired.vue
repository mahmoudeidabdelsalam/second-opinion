<template>
  <section>
    <v-row v-if="!waitingForData && expired.length > 0">
      <v-col
        cols="12"
        md="6"
        v-for="(appointment, index) in expired"
        :key="index"
      >
        <div class="appointment rounded-lg overflow-hidden">
          <div class="head grey_dark pa-3">
            <div class="m mb-2">
              <v-icon color="white"> mdi-calendar </v-icon>
              <span class="white--text" v-if="appointment.reservation_date">
                {{
                  appointment.reservation_date.day.label +
                  " الموافق " +
                  appointment.reservation_date.day.value +
                  " / " +
                  appointment.reservation_date.month +
                  " - الساعة: " +
                  appointment.reservation_date.time
                }}
              </span>
            </div>
          </div>
          <div class="body grey py-5 px-3">
            <div class="doctor d-flex justify-start align-center mb-4">
              <v-avatar class="mx-2 rounded-lg" size="91">
                <v-img
                  :src="appointment.doctor.profile"
                  :lazy-src="appointment.doctor.profile"
                  cover
                  max-height="90"
                  max-width="90"
                  alt="doctor"
                ></v-img>
              </v-avatar>
              <div class="doctor-info px-2">
                <span class="d-block mb-2 font-weight-bold white--text">
                  {{ appointment.doctor.name }}
                </span>
                <span
                  class="d-block mb-2 font-weight-regular body-2 white--text"
                >
                  {{ appointment.doctor.title }}
                </span>
              </div>
            </div>

            <!-- <v-dialog
              v-model="rateDialogs[index]"
              persistent
              transition="dialog-top-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  block
                  class="white primary--text py-6 rounded-lg font-weight-bold"
                >
                  تقييم الخدمة
                </v-btn>
              </template>
              <v-card>
                <v-toolbar class="text-h6" elevation="0">
                  <v-icon color="primary">mdi-star-outline</v-icon>
                  <span class="mx-4">تقييم الخدمة</span>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="closeDialog(index)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text> بوكس التقييم </v-card-text>
                <v-card-actions>
                  <v-btn
                    block
                    class="primary py-6 rounded-lg"
                    @click="rateService(appointment.id, index)"
                  >
                    تقييم الخدمة
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- waiting for data -->
    <v-skeleton-loader
      v-if="waitingForData && expired.length == 0"
      max-width="300"
      type="card"
    ></v-skeleton-loader>

    <!-- no data -->
    <div
      v-if="!waitingForData && expired.length == 0"
      class="d-flex flex-column align-center justify-center"
    >
      <v-avatar class="mb-5" size="120">
        <v-img
          :src="require('@/assets/images/pen-no-data.webp')"
          :lazy-src="require('@/assets/images/pen-no-data.webp')"
          cover
        ></v-img>
      </v-avatar>
      <span class="d-block font-weight-bold primary--text">
        ليس لديك مواعيد منتهية
      </span>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Expired",

  props: {
    expired: {
      type: Array,
      default: () => [],
    },

    waitingForData: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    // dialogs
    rateDialogs: [],
  }),

  mounted() {
    this.rateDialogs.forEach((dialog, index) => {
      this.rateDialogs[index] = false;
    });
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    closeDialog(index) {
      this.rateDialogs[index] = false;
    },

    rateService(appointment_id, index) {
      console.log(appointment_id, index);
      this.rateDialogs[index] = false;
    },
  },
};
</script>

<style></style>
