<template>
  <section class="income-chart pa-5 white rounded-lg">
    <span class="d-block mb-5 subtitle-1 font-weight-bold">
      ايرادات اخر 7 ايام (ريال)
    </span>

    <v-card class="mx-auto text-center" color="primary" dark max-width="600">
      <v-card-text>
        <v-sheet color="primary">
          <v-sparkline
            :labels="chartLabels"
            :value="chartValues"
            label-size="12"
            color="white"
            height="145"
            padding="20"
            stroke-linecap="round"
            auto-draw
            auto-draw-duration="2000"
            smooth
            type="bar"
          >
            <template v-slot:label="item">
              {{ item.value }}
            </template>
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
  name: "IncomeChart",

  props: {
    invoices: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    chartLabels: ["", "", "", "", "", "", ""],
    chartValues: [0, 0, 0, 0, 0, 0, 0],
  }),

  mounted() {
    console.log(this.invoices);

    // set chart labels to  day invoice.value + suffix
    this.chartLabels = this.invoices.map((invoice) => {
      return invoice.value + invoice.suffix;
    });

    // set chart values to day invoice.value
    this.chartValues = this.invoices.map((invoice) => {
      // if invoice suffix is M return value * 1000000
      if (invoice.suffix === "M") {
        return invoice.value * 1000000;
      }

      // if invoice suffix is K return value * 1000
      else if (invoice.suffix === "K") {
        return invoice.value * 1000;
      }

      // else return value
      else {
        return invoice.value;
      }
    });
  },
};
</script>
