<template>
  <v-card flat>
    <v-form ref="form" :v-model="valid" lazy-validation>
      <span class="d-block text-h6 font-weight-bold mb-5 primary--text">
        Doctor information
      </span>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.name_en"
            :rules="nameRules"
            label="English name"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.name_ar"
            :rules="nameRules"
            label="Arabic name"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.title_en"
            :rules="nameRules"
            label="English title"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.title_ar"
            :rules="nameRules"
            label="Arabic title"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.description_en"
            :rules="descriptionRules"
            label="English description"
            outlined
            dense
            rows="3"
            class="rounded-lg"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.description_ar"
            :rules="descriptionRules"
            label="Arabic description"
            outlined
            dense
            rows="3"
            class="rounded-lg"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="Email"
            type="email"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.phone"
            :rules="phoneRules"
            label="Phone"
            type="tel"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>
      </v-row>

      <span class="d-block text-h6 font-weight-bold mb-5 primary--text">
        Speciality information
      </span>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="form.speciality"
            :items="[
              { text: 'Dentist', value: 'Dentist' },
              { text: 'Dermatologist', value: 'Dermatologist' },
              { text: 'Gynecologist', value: 'Gynecologist' },
              { text: 'Pediatrician', value: 'Pediatrician' },
              { text: 'Psychiatrist', value: 'Psychiatrist' },
              { text: 'Surgeon', value: 'Surgeon' },
              { text: 'Urologist', value: 'Urologist' },
            ]"
            :rules="selectRules"
            label="Doctor speciality"
            outlined
            dense
            class="rounded-lg"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="form.department"
            :items="[
              { text: 'Dentist', value: 'Dentist' },
              { text: 'Dermatologist', value: 'Dermatologist' },
              { text: 'Gynecologist', value: 'Gynecologist' },
              { text: 'Pediatrician', value: 'Pediatrician' },
              { text: 'Psychiatrist', value: 'Psychiatrist' },
              { text: 'Surgeon', value: 'Surgeon' },
              { text: 'Urologist', value: 'Urologist' },
            ]"
            :rules="selectRules"
            label="Doctor department"
            outlined
            dense
            class="rounded-lg"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn color="primary" class="text-capitalize rounded-lg">
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "DoctorDetails",

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
