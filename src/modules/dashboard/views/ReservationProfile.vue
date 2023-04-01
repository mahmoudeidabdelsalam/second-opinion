<template>
  <section class="white rounded-lg pa-5">
    <div class="reservation-profile" v-if="!waitingForData">
      <div
        class="head mb-5 d-flex flex-column flex-md-row justify-start justify-md-space-between align-start"
      >
        <div class="doctor-details">
          <div class="name mb-2">
            <span class="font-weight-bold text-h6 primary--text">الطبيب: </span>
            <span class="font-weight-regular text-h6">
              {{ reservation.doctor.full_name }}
            </span>
          </div>
          <div class="mb-2">
            <span class="font-weight-bold text-h6 primary--text">التخصص: </span>
            <span class="font-weight-regular text-h6">
              {{ reservation.doctor.title }}
            </span>
          </div>
          <div>
            <span class="font-weight-bold text-h6 primary--text">
              البريد الالكترونى:
            </span>
            <span class="font-weight-regular text-h6">
              {{ reservation.doctor.email }}
            </span>
          </div>
        </div>

        <div class="patient-details">
          <div class="name mb-2">
            <span class="font-weight-bold text-h6 primary--text"
              >اسم المريض:
            </span>
            <span class="font-weight-regular text-h6">
              {{ reservation.patient.full_name }}
            </span>
          </div>

          <div class="phone">
            <span class="font-weight-bold text-h6 primary--text"
              >رقم الهاتف:
            </span>
            <span class="font-weight-regular text-h6">
              {{ reservation.patient.phone_number }}
            </span>
          </div>
        </div>
      </div>

      <v-divider></v-divider>

      <div class="reservation-status py-5">
        <span class="font-weight-bold text-h6 primary--text">حالة الحجز: </span>
        <span class="font-weight-regular text-h6">
          {{ reservation.status.text }}
        </span>
      </div>

      <div class="body mb-5 rounded-lg" style="border: 1px solid #ddd">
        <div class="files pa-5">
          <span class="d-block mb-5 font-weight-regular text-h6">
            التقارير المرفقة من قبل المريض
          </span>

          <v-row>
            <v-col
              cols="12"
              md="3"
              v-for="(file, index) in reservation.files.attachments"
              :key="file.id"
            >
              <div
                class="file primary_bg pa-4 rounded-xl d-flex justify-space-between align-center"
                style="border: 1px solid #008ad0 !important"
              >
                <div>
                  <v-icon size="35" color="primary">mdi-paperclip</v-icon>
                  <span class="secondary--text">
                    ملف مرفق ({{ index + 1 }})
                  </span>
                </div>
                <v-btn
                  icon
                  large
                  class="mx-2 white primary--text elevation-3"
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

        <v-divider></v-divider>

        <div class="files pa-5">
          <span class="d-block mb-5 font-weight-regular text-h6">
            الاشعة و التحاليل المرفقة من قبل المريض
          </span>

          <v-row>
            <v-col
              cols="12"
              md="3"
              v-for="(file, index) in reservation.files.rays"
              :key="file.id"
            >
              <div
                class="file primary_bg pa-4 rounded-xl d-flex justify-space-between align-center"
                style="border: 1px solid #008ad0 !important"
              >
                <div>
                  <v-icon size="35" color="primary">mdi-image</v-icon>
                  <span class="secondary--text">
                    ملف مرفق ({{ index + 1 }})
                  </span>
                </div>
                <v-btn
                  icon
                  large
                  class="mx-2 white primary--text elevation-3"
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

      <div class="body mb-5 rounded-lg" style="border: 1px solid #ddd">
        <div class="files pa-5">
          <div>
            <span class="d-block mb-5 font-weight-regular text-h6">
              التقرير المرفق من قبل الطبيب
            </span>

            <div class="mavonEditor mb-5">
              <!-- <mavon-editor
                :toolbars="markdownOption"
                v-model="reportContent"
                language="en"
                placeholder="اكتب هنا"
                style="height: 600px"
              /> -->

              <v-col cols="12" md="8" v-if="!reservation.files.report">
                <v-textarea
                  v-model="reportContent"
                  :rules="descriptionRules"
                  label="اكتب التقرير هنا"
                  outlined
                  dense
                  auto-grow
                  rows="12"
                  hide-details="true"
                ></v-textarea>
              </v-col>
            </div>

            <v-btn
              v-if="!reservation.files.report"
              color="primary"
              class="white--text py-6 px-10"
              @click="uploadReport"
            >
              ارسال التقرير
            </v-btn>
          </div>

          <v-row v-if="reservation.files.report">
            <v-col cols="12" md="3">
              <div
                class="file primary_bg pa-4 rounded-xl d-flex justify-space-between align-center"
                style="border: 1px solid #008ad0 !important"
              >
                <div>
                  <v-icon size="35" color="primary">mdi-file</v-icon>
                  <span class="secondary--text"> تقرير مرفق </span>
                </div>
                <v-btn
                  icon
                  large
                  class="mx-2 white primary--text elevation-3"
                  :href="reservation.files.report.src"
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReservationProfile",

  data: () => ({
    // waiting for data
    waitingForData: false,

    markdownOption: {
      bold: true,
      header: true,
      underline: true,
      ol: true,
      ul: true,
      link: true,
      table: true,
      fullscreen: true,
      readmodel: true,
      alignleft: true,
      aligncenter: true,
      alignright: true,
      subfield: true,
      preview: true,
      htmlcode: true,
    },
    reportContent: "",

    // upload loading
    uploadLoading: false,

    // reservation
    reservation: {},
  }),

  computed: {
    ...mapGetters({
      user: "user/userData",
      valid: "validationRules/valid",
      selectFileRules: "validationRules/selectFileRules",
    }),
  },

  created() {
    // init data
    this.initData();
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      this.waitingForData = true;

      // get reservation

      this.axios
        .get(`dashboard/reservations/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          // reservation
          this.reservation = response.data.data;

          this.waitingForData = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },

    // upload report
    uploadReport() {
      this.uploadLoading = true;

      let data = new FormData();
      data.append("report", this.reportContent);

      this.axios
        .post(
          `dashboard/reservations/${this.$route.params.id}/upload-report`,
          data,
          { headers: { Authorization: `Bearer ${localStorage.token}` } }
        )
        .then((response) => {
          this.uploadLoading = false;
          this.handleResponse(response);

          // reservation
          this.reservation = response.data.data;
        })
        .catch((error) => {
          this.handleResponse(error.response);

          this.uploadLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.v-note-op {
  background-color: #e6eff7 !important;
  * {
    color: #161616 !important;
  }
}
</style>
