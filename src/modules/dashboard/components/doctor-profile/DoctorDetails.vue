<template>
  <v-card flat>
    <span class="d-block text-h6 font-weight-bold mb-5 black--text">
      بيانات الطبيب
    </span>
    <v-form ref="form" :v-model="valid">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.full_name_en"
            :rules="nameRules"
            label="الاسم باللغة الانجليزية"
            outlined
            dense
            dir="ltr"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.full_name_ar"
            :rules="nameRules"
            label="الاسم باللغة العربية"
            outlined
            dense
            dir="rtl"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.title_en"
            :rules="nameRules"
            label="اللقب باللغة الانجليزية"
            outlined
            dense
            dir="ltr"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.title_ar"
            :rules="nameRules"
            label="اللقب باللغة العربية"
            outlined
            dense
            dir="rtl"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.description_en"
            :rules="descriptionRules"
            label="الوصف باللغة الانجليزية"
            outlined
            dense
            auto-grow
            rows="2"
            dir="ltr"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.description_ar"
            :rules="descriptionRules"
            label="الوصف باللغة العربية"
            outlined
            dense
            auto-grow
            rows="2"
            dir="rtl"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            type="email"
            label="البريد الالكتروني"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.phone_number"
            :rules="phoneRules"
            type="tel"
            label="رقم الهاتف"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="form.gender"
            :items="genders"
            :rules="selectRules"
            label="النوع"
            outlined
            dense
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.session_price"
            :rules="numberRules"
            type="number"
            label="سعر الكشف"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.consultation_price"
            :rules="numberRules"
            type="number"
            label="سعر الاستشارة"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="form.session_duration"
            :items="[15, 30, 45, 60]"
            :rules="selectRules"
            label="مدة الكشف (بالدقائق)"
            outlined
            dense
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.educations_en"
            :rules="descriptionRules"
            label="الشهادات باللغة الانجليزية"
            outlined
            dense
            auto-grow
            rows="2"
            dir="ltr"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.educations_ar"
            :rules="descriptionRules"
            label="الشهادات باللغة العربية"
            outlined
            dense
            auto-grow
            rows="2"
            dir="rtl"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.experiences_en"
            :rules="descriptionRules"
            label="الخبرات باللغة الانجليزية"
            outlined
            dense
            auto-grow
            rows="2"
            dir="ltr"
          ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
          <v-textarea
            v-model="form.experiences_ar"
            :rules="descriptionRules"
            label="الخبرات باللغة العربية"
            outlined
            dense
            auto-grow
            rows="2"
            dir="rtl"
          ></v-textarea>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.job_id"
            :rules="jobIdRules"
            type="number"
            label="الرقم الوظيفي"
            outlined
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-btn
            color="primary"
            class="text-capitalize rounded-lg"
            @click="save"
          >
            حفظ
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DoctorDetails",

  props: {
    doctor: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    form: {
      full_name_en: "",
      full_name_ar: "",
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      email: "",
      phone_number: "",
      gender: "",
      session_price: "",
      session_duration: "",
      consultation_price: "",
      job_id: "",
      educations_en: "",
      educations_ar: "",
      experiences_en: "",
      experiences_ar: "",
    },

    // genders
    genders: [
      { text: "ذكر", value: "m" },
      { text: "انثى", value: "f" },
    ],
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      descriptionRules: "validationRules/descriptionRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      numberRules: "validationRules/numberRules",
      selectRules: "validationRules/selectRules",
      durationRules: "validationRules/durationRules",
      jobIdRules: "validationRules/jobIdRules",
    }),
  },

  mounted() {
    // bind data to form
    this.form.full_name_en = this.doctor.en.full_name;
    this.form.full_name_ar = this.doctor.ar.full_name;
    this.form.title_en = this.doctor.en.title;
    this.form.title_ar = this.doctor.ar.title;
    this.form.description_en = this.doctor.en.description;
    this.form.description_ar = this.doctor.ar.description;
    this.form.email = this.doctor.email;
    this.form.phone_number = this.doctor.phone_number;
    this.form.gender = this.doctor.gender;
    this.form.session_price = this.doctor.session_price;
    this.form.session_duration = this.doctor.session_duration;
    this.form.consultation_price = this.doctor.consultation_price;
    this.form.job_id = this.doctor.job_id;
    this.form.educations_en = this.doctor.en.educations;
    this.form.educations_ar = this.doctor.ar.educations;
    this.form.experiences_en = this.doctor.en.experiences;
    this.form.experiences_ar = this.doctor.ar.experiences;
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
      showRequsetLoading: "loading/showRequestLoading",
      hideRequsetLoading: "loading/hideRequestLoading",
    }),

    async save() {
      if (this.$refs.form.validate()) {
        let data = new URLSearchParams();
        data.append("full_name:en", this.form.full_name_en);
        data.append("full_name:ar", this.form.full_name_ar);
        data.append("gender", this.form.gender);
        data.append("email", this.form.email);
        data.append("phone_number", this.form.phone_number);
        data.append("title:en", this.form.title_en);
        data.append("title:ar", this.form.title_ar);
        data.append("description:en", this.form.description_en);
        data.append("description:ar", this.form.description_ar);
        data.append("session_price", this.form.session_price);
        data.append("session_duration", this.form.session_duration);
        data.append("consultation_price", this.form.consultation_price);
        data.append("job_id", this.form.job_id);
        data.append("educations:en", this.form.educations_en);
        data.append("educations:ar", this.form.educations_ar);
        data.append("experiences:en", this.form.experiences_en);
        data.append("experiences:ar", this.form.experiences_ar);

        // show request loading
        this.showRequsetLoading();

        await this.axios
          .put(`dashboard/doctors/${this.$route.params.id}`, data, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            this.handleResponse(response);

            // hide request loading
            this.hideRequsetLoading();
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide request loading
            this.hideRequsetLoading();
          });
      }
    },
  },
};
</script>
