<template>
  <v-card flat>
    <span class="d-block primary--text text-h6 font-weight-bold mb-5"
      >تكلفة الكشف</span
    >

    <v-form
      ref="form"
      :v-model="valid"
      lazy-validation
      style="max-width: 700px"
    >
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.session_price"
            :rules="numberRules"
            label="سعر الكشف"
            type="number"
            outlined
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.session_duration"
            :rules="numberRules"
            label="مدة الكشف بالدقائق"
            type="number"
            outlined
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn color="primary" class="text-capitalize rounded-lg">
            حفظ
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "Cost",

  data: () => ({
    valid: true,
    form: {
      session_price: null,
      session_duration: null,
    },
    numberRules: [(v) => !!v || "This field is required"],
  }),
};
</script>

<style></style>
