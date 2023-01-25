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
              التقارير المرفقة من قبل الطبيب
            </span>

            <v-form
              ref="form"
              :v-model="valid"
              style="max-width: 500px"
              v-if="!reservation.files.report"
            >
              <v-file-input
                v-model="reportForm.report_file"
                :rules="selectFileRules"
                label="ارفق ملف"
                placeholder="اختر الملفات"
                prepend-icon="mdi-paperclip"
                outlined
              >
                <template v-slot:selection="{ text }">
                  <v-chip color="primary" dark label small>
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>

              <!-- uploading -->
              <v-progress-linear
                v-if="uploadLoading"
                indeterminate
                color="primary"
                class="mb-5"
              ></v-progress-linear>

              <v-btn
                block
                color="primary"
                class="white--text py-6"
                @click="uploadReport"
              >
                ارفق التقرير
              </v-btn>
            </v-form>
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

    // upload loading
    uploadLoading: false,

    reportForm: {
      report_file: null,
    },

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
      getData: "crudOperations/getData",
      addData: "crudOperations/addData",
    }),

    // init data
    initData() {
      this.waitingForData = true;

      // get reservation
      this.getData(`dashboard/reservations/${this.$route.params.id}`).then(
        (res) => {
          // reservation
          this.reservation = res;

          this.waitingForData = false;
        }
      );
    },

    // upload report
    uploadReport() {
      if (this.$refs.form.validate()) {
        this.uploadLoading = true;

        let data = new FormData();
        data.append("report", this.reportForm.report_file);

        this.axios
          .post(
            `dashboard/reservations/${this.$route.params.id}/upload-report`,
            data,
            { headers: { Authorization: `Bearer ${localStorage.token}` } }
          )
          .then((response) => {
            this.uploadLoading = false;

            // reservation
            this.reservation = response.data.data;
          })
          .catch((error) => {
            // handle error by store action
            this.handleError(error);
          });
      }
    },
  },
};
</script>
