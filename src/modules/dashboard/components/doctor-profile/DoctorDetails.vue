<template>
  <v-card flat>
    <v-form ref="form" :v-model="valid">
      <span class="d-block text-h6 font-weight-bold mb-5 primary--text">
        بيانات الطبيب
      </span>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.name_en"
            :rules="nameRules"
            label="الاسم باللغة الانجليزية"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.name_ar"
            :rules="nameRules"
            label="الاسم باللغة العربية"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.title_en"
            :rules="nameRules"
            label="اللقب باللغة الانجليزية"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.title_ar"
            :rules="nameRules"
            label="اللقب باللغة العربية"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.description_en"
            :rules="descriptionRules"
            label="الوصف باللغة الانجليزية"
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
            label="الوصف باللغة العربية"
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
            label="البريد الالكتروني"
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
            label="رقم الهاتف"
            type="tel"
            outlined
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>
      </v-row>

      <span class="d-block text-h6 font-weight-bold mb-5 primary--text">
        تخصص الطبيب
      </span>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="form.speciality"
            :items="[
              { text: 'الاسنان', value: 'Dentist' },
              { text: 'العظام', value: 'Dermatologist' },
              { text: 'الباطنةو القلب', value: 'Gynecologist' },
              { text: 'الجراحة العامة', value: 'Pediatrician' },
              { text: 'جراة المناظير', value: 'Psychiatrist' },
            ]"
            :rules="selectRules"
            label="تخصص الطبيب"
            outlined
            dense
            class="rounded-lg"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="form.department"
            :items="[
              { text: 'الاسنان', value: 'Dentist' },
              { text: 'العظام', value: 'Dermatologist' },
              { text: 'الباطنةو القلب', value: 'Gynecologist' },
              { text: 'الجراحة العامة', value: 'Pediatrician' },
              { text: 'جراة المناظير', value: 'Psychiatrist' },
            ]"
            :rules="selectRules"
            label="القسم"
            outlined
            dense
            class="rounded-lg"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
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
import { mapGetters } from "vuex";

export default {
  name: "DoctorDetails",

  data: () => ({
    form: {
      name_en: "",
      name_ar: "",
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      email: "",
      phone: "",
      speciality: "",
      department: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      descriptionRules: "validationRules/descriptionRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      selectRules: "validationRules/selectRules",
    }),
  },
};
</script>

<style></style>
