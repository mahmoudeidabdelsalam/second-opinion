<template>
  <section class="reservations-chart pa-5 white rounded-lg">
    <span class="d-block mb-5 subtitle-1 font-weight-bold">
      الحجوزات اخر 7 ايام
    </span>

    <v-card class="mx-auto text-center" color="primary" dark max-width="600">
      <v-card-text>
        <v-sheet color="primary">
          <v-sparkline
            :value="reservations"
            label-size="12"
            color="white"
            height="145"
            padding="20"
            stroke-linecap="round"
            smooth
            auto-draw
            :auto-draw-duration="2000"
          >
            <template v-slot:label="item">{{ item.value }}</template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn block text>اذهب الى التقارير</v-btn>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>
export default {
  name: "ReservationsChart",

  props: {
    reservations: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
