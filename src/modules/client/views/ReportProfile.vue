<template>
  <section class="pa-5">
    <!-- title -->
    <span
      class="d-block mb-5 text-center text-h5 font-weight-bold primary--text"
    >
      استشارة طبية
    </span>

    <div class="report-profile" v-if="!waitingForData">
      <div
        class="head mb-5 d-flex flex-column flex-md-row justify-start justify-md-space-between align-start"
      >
        <div class="doctor-details">
          <div class="name mb-2">
            <span class="font-weight-bold text-h6">الطبيب: </span>
            <span class="font-weight-regular text-h6">
              {{ report.doctor.name }}
            </span>
          </div>
          <div class="mb-2">
            <span class="font-weight-bold text-h6">التخصص: </span>
            <span class="font-weight-regular text-h6">
              {{ report.doctor.title }}
            </span>
          </div>
          <div>
            <span class="font-weight-bold text-h6">
              رقم ترخيص مزاولة المهنة:
            </span>
            <span class="font-weight-regular text-h6">
              {{ report.doctor.job_id }}
            </span>
          </div>
        </div>

        <div class="patient-details">
          <div class="name mb-2">
            <span class="font-weight-bold text-h6">اسم المريض: </span>
            <span class="font-weight-regular text-h6">
              {{ user.full_name }}
            </span>
          </div>

          <div class="phone">
            <span class="font-weight-bold text-h6">رقم الهاتف: </span>
            <span class="font-weight-regular text-h6">
              {{ user.phone_number }}
            </span>
          </div>
        </div>
      </div>

      <div class="body mb-5 rounded-lg secondary_bg" style="min-height: 500px">
        <!-- iframe to previer pdf -->
        <iframe
          v-if="report.status.value == 3"
          src="https://www.africau.edu/images/default/sample.pdf"
          frameborder="0"
          width="100%"
          height="500px"
        ></iframe>

        <div class="patient-files pa-5" v-else>
          <span class="d-block font-weight-bold mb-3 primary--text text-h6">
            الملفات المرفقة
          </span>

          <v-row class="mb-6">
            <v-col
              cols="12"
              md="3"
              v-for="(file, index) in report.files.attachments"
              :key="file.id"
            >
              <div
                class="file secondary pa-4 rounded-xl d-flex justify-space-between align-center"
              >
                <div>
                  <v-icon size="40" color="white">mdi-paperclip</v-icon>
                  <span class="white--text">ملف {{ index + 1 }}</span>
                </div>
                <v-btn
                  icon
                  large
                  class="mx-2 white primary--text"
                  :href="file.src"
                  target="_blank"
                  download
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <!-- rays -->
          <span class="d-block font-weight-bold mb-3 primary--text text-h6">
            الاشعة و التحاليل
          </span>

          <v-row>
            <v-col
              cols="12"
              md="3"
              v-for="(file, index) in report.files.rays"
              :key="file.id"
            >
              <div
                class="file secondary pa-4 rounded-xl d-flex justify-space-between align-center"
              >
                <div>
                  <v-icon size="40" color="white">mdi-paperclip</v-icon>
                  <span class="white--text">ملف {{ index + 1 }}</span>
                </div>
                <v-btn
                  icon
                  large
                  class="mx-2 white primary--text"
                  :href="file.src"
                  target="_blank"
                  download
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="footer d-flex justify-end">
        <div class="doctor-signature">
          <span class="d-block font-weight-bold text-h6">توقيع الطبيب: </span>
          <v-avatar class="mx-2 rounded-lg" size="200">
            <v-img
              :src="report.doctor.signature"
              :lazy-src="report.doctor.signature"
              contain
              :alt="report.doctor.name"
            ></v-img>
          </v-avatar>
        </div>
      </div>
    </div>

    <!-- waiting for data -->
    <v-skeleton-loader
      v-if="waitingForData"
      max-width="300"
      type="card"
    ></v-skeleton-loader>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ReportProfile",

  data: () => ({
    // waiting for data
    waitingForData: false,

    // report
    report: {},
  }),

  computed: {
    ...mapGetters({
      user: "user/userData",
    }),
  },

  created() {
    // init data
    this.initData();
  },

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
    }),

    // init data
    initData() {
      this.waitingForData = true;

      // get report
      this.getData(`patient/reservations/${this.$route.params.id}`).then(
        (res) => {
          // report
          this.report = res;

          this.waitingForData = false;
        }
      );
    },
  },
};
</script>
