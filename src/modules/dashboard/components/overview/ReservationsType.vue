<template>
  <section class="reservations-type pa-5 white rounded-lg">
    <span class="d-block mb-5 subtitle-1 font-weight-bold">
      الحجوزات حسب النوع
    </span>

    <v-progress-circular
      class="mx-auto mb-5 d-flex"
      :rotate="-90"
      :size="200"
      :width="30"
      :value="
        value.call > 0
          ? ((value.call / (value.call + value.chat)) * 100).toFixed(1)
          : 0
      "
      color="primary"
    >
    </v-progress-circular>

    <div class="footer d-flex justify-space-around align-center">
      <div class="box d-flex justify-start align-center">
        <v-icon size="20" color="primary">mdi-video</v-icon>
        <span class="mx-2 subtitle-1 font-weight-medium">
          <!-- percentage -->
          %
          {{
            reservations.call > 0
              ? (
                  (reservations.call /
                    (reservations.call + reservations.chat)) *
                  100
                ).toFixed(1)
              : 0
          }}
        </span>
        <span class="subtitle-1 font-weight-medium">مرئية</span>
      </div>

      <div class="box d-flex justify-start align-center">
        <v-icon size="20" color="secondary">mdi-file</v-icon>
        <span class="mx-2 subtitle-1 font-weight-medium"
          ><!-- percentage -->
          %
          {{
            reservations.chat > 0
              ? (
                  (reservations.chat /
                    (reservations.call + reservations.chat)) *
                  100
                ).toFixed(1)
              : 0
          }}</span
        >
        <span class="subtitle-1 font-weight-medium">كتابية</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ReservationsType",

  props: {
    reservations: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    interval: {},
    value: 0,
  }),

  mounted() {
    this.interval = setInterval(() => {
      this.value = this.reservations;
    }, 1000);
  },
};
</script>
