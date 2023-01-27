<template>
  <section class="income-chart pa-5 white rounded-lg">
    <span class="d-block mb-5 subtitle-1 font-weight-bold">
      ايرادات اخر 7 ايام
    </span>

    <v-card class="mx-auto text-center" color="primary" dark max-width="600">
      <v-card-text>
        <v-sheet color="primary">
          <v-sparkline
            :value="value"
            label-size="10"
            color="white"
            height="145"
            padding="20"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item"> {{ item.value }} ريال </template>
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

  data: () => ({
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
};
</script>
