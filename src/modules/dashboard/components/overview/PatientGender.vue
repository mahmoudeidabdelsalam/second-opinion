<template>
  <section class="patient-gender pa-5 white rounded-lg">
    <span class="d-block mb-5 subtitle-1 font-weight-bold">
      المرضى حسب النوع
    </span>

    <v-progress-circular
      class="mx-auto mb-5 d-flex"
      :rotate="-90"
      :size="200"
      :width="30"
      :value="
        patients.male > 0
          ? ((patients.male / (patients.male + patients.female)) * 100).toFixed(
              1
            )
          : 0
      "
      color="primary"
    >
    </v-progress-circular>

    <div class="footer d-flex justify-space-around align-center">
      <div class="box d-flex justify-start align-center">
        <span class="rounded-circle pa-2 primary"></span>
        <span class="mx-2 subtitle-1 font-weight-medium">
          <!-- percentage -->
          %
          {{
            patients.male > 0
              ? (
                  (patients.male / (patients.male + patients.female)) *
                  100
                ).toFixed(1)
              : 0
          }}
        </span>
        <span class="subtitle-1 font-weight-medium">ذكور</span>
      </div>

      <div class="box d-flex justify-start align-center">
        <span class="rounded-circle pa-2 secondary"></span>
        <span class="mx-2 subtitle-1 font-weight-medium">
          <!-- percentage -->
          %
          {{
            patients.female > 0
              ? (
                  (patients.female / (patients.male + patients.female)) *
                  100
                ).toFixed(1)
              : 0
          }}
        </span>
        <span class="subtitle-1 font-weight-medium">اناث</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PatientGender",

  props: {
    patients: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
