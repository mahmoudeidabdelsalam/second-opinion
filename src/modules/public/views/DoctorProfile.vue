<template>
  <main class="doctor-profile py-10">
    <v-container style="max-width: 1400px" v-if="doctor">
      <div
        class="doctor-card primary pa-5 mb-5 rounded-lg d-flex flex-column flex-md-row justify-start align-start"
      >
        <v-avatar class="rounded-lg mb-5" size="150">
          <v-img
            :src="doctor.profile"
            :lazy-src="doctor.profile"
            cover
            max-height="150"
            max-width="150"
            alt="article"
          ></v-img>
        </v-avatar>

        <div class="doctor-info mx-0 mx-md-4">
          <span class="d-block mb-2 white--text font-weight-bold">
            {{ doctor.title }}
          </span>
          <span class="d-block mb-5 white--text font-weight-bold text-h6">
            {{ doctor.full_name }}
          </span>
          <div class="tags d-flex justify-start align-start flex-wrap">
            <v-btn
              depressed
              link
              :to="{
                name: 'PublicDoctors',
                query: { department_id: doctor.department.id },
              }"
              class="primary_bg primary--text"
            >
              {{ doctor.department.name }}
            </v-btn>
          </div>
        </div>
      </div>

      <v-row>
        <v-col cols="12" md="8">
          <div class="about-doctor white rounded-lg elevation-3 pa-5 mb-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-information-outline</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                عن الطبيب
              </span>
            </div>
            <p class="font-weight-light font-weight-bold secondary--text">
              {{ doctor.description }}
            </p>
          </div>

          <div class="about-doctor white rounded-lg elevation-3 pa-5 mb-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-certificate</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                الشهادات
              </span>
            </div>
            <p
              class="font-weight-light font-weight-bold secondary--text"
              v-for="item in 3"
              :key="item"
            >
              {{ doctor.educations }}
            </p>
          </div>

          <div class="about-doctor white rounded-lg elevation-3 pa-5">
            <div class="head mb-3 d-flex justify-start align-center">
              <v-icon color="primary">mdi-currency-usd</v-icon>
              <span class="mx-2 font-weight-bold secondary--text text-h6">
                الاسعار
              </span>
            </div>
            <p class="font-weight-light font-weight-bold secondary--text">
              <span class="primary--text">الاستشارة: </span>
              {{ doctor.session_price }} ريال
            </p>
            <p class="font-weight-light font-weight-bold secondary--text">
              <span class="primary--text">التقرير الطبى: </span>
              {{ doctor.consultation_price }} ريال
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="px-5">
            <div class="head mb-3">
              <span
                class="d-block mb-5 font-weight-bold secondary--text text-h6"
              >
                احجز موعدك
              </span>
            </div>
            <v-btn
              class="head primary white--text pa-7 mb-3 d-flex justify-start align-center rounded-lg"
              block
              @click.prevent="showDatePicker = !showDatePicker"
            >
              <v-icon class="white pa-1 rounded-lg" color="primary">
                mdi-video
              </v-icon>
              <span class="mx-2 font-weight-bold text-capitalize">
                حجز استشارة صوتية/مرئية
              </span>
            </v-btn>

            <v-form
              ref="form"
              :v-model="valid"
              lazy-validation
              class="mb-10"
              v-if="showDatePicker"
            >
              <v-menu
                v-model="menu"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="reservation_day"
                    label="اختر اليوم"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    clearable
                    required
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="reservation_day"
                  @change="getAvailablTimes"
                ></v-date-picker>
              </v-menu>

              <!-- loading -->
              <v-progress-linear
                v-if="loading_resutls"
                indeterminate
                color="primary"
                class="mb-5"
              ></v-progress-linear>

              <v-radio-group
                v-model="reservation_time"
                row
                v-if="available_times.length"
                class="font-weight-bold"
              >
                <v-radio
                  v-for="item in available_times"
                  :key="item"
                  :label="item"
                  :value="item"
                  class="mb-2"
                ></v-radio>
              </v-radio-group>

              <v-btn color="primary" depressed @click="bookVideoAppointment">
                ادفع لتاكيد الحجز
              </v-btn>
            </v-form>

            <v-btn
              class="head primary white--text pa-7 mb-5 d-flex justify-start align-center rounded-lg"
              block
              @click.prevent="showReportForm = !showReportForm"
            >
              <v-icon class="white pa-1 rounded-lg" color="primary">
                mdi-file-multiple
              </v-icon>
              <span class="mx-2 font-weight-bold text-capitalize">
                طلب استشارة مكتوبة
              </span>
            </v-btn>

            <v-form
              ref="form"
              :v-model="valid"
              lazy-validation
              class="mb-10"
              v-if="showReportForm"
            >
              <v-textarea
                v-model="notes"
                label="اكتب ملاحظاتك ..."
                outlined
                dense
                auto-grow
                rows="4"
              ></v-textarea>

              <v-file-input
                v-model="report_files"
                label="ارفق ملف"
                placeholder="اختر الملفات"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
              >
                <template v-slot:selection="{ text }">
                  <v-chip color="primary" dark label small>
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>

              <file-pond
                ref="pond"
                label-idle="ارفق صورة الاشعة او التحاليل"
                accepted-file-types="image/jpeg, image/png, image/jpg, image/gif, image/webp"
                @addfile="onAddFile"
              />

              <v-btn class="mt-3" color="primary" depressed @click="askReport">
                ادفع لتاكيد الحجز
              </v-btn>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- waiting for data -->
    <v-container style="max-width: 1400px" v-else>
      <v-skeleton-loader max-width="300" type="card"></v-skeleton-loader>
    </v-container>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

// Import Vue FilePond
import vueFilePond from "vue-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import FilePond plugins
// Please note that you need to install these plugins separately
// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "DoctorProfile",

  components: {
    FilePond,
  },

  data: () => ({
    // fotm validation
    valid: true,
    // doctor
    doctor: null,
    // date picker
    menu: false,
    // show date picker
    showDatePicker: false,
    // reservation day
    reservation_day: null,
    // availabl times
    available_times: [],
    // reservation time
    reservation_time: null,
    // row radio group
    rowRadio: null,

    // show reportForm
    showReportForm: false,

    // notes
    notes: "",

    // required rules
    requiredRules: [(v) => !!v || "الحقل مطلوب"],

    // file
    report_files: [],
    // image
    image: "",

    // loading results
    loading_resutls: false,
  }),

  created() {
    // init data
    this.initData();
  },

  ...mapGetters({
    valid: "validationRules/valid",
  }),

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
      addData: "crudOperations/addData",
    }),

    // init data
    initData() {
      // get doctors
      this.getData(`patient/doctors/${this.$route.params.id}`).then((res) => {
        this.doctor = res;
      });
    },

    // get available times
    getAvailablTimes() {
      if (this.$refs.form.validate()) {
        this.loading_resutls = true;
        let data = new FormData();
        data.append("doctor_id", this.$route.params.id);
        data.append("reservation_day", this.reservation_day);

        this.addData({
          url: "patient/reservations/get-available-dates",
          data: data,
        }).then((res) => {
          this.loading_resutls = false;
          res
            ? (this.available_times = res)
            : ((this.available_times = []), this.$refs.form.reset());
        });
      }
    },

    bookVideoAppointment() {
      if (this.reservation_time) {
        let data = new FormData();
        data.append("doctor_id", this.$route.params.id);
        data.append("reservation_day", this.reservation_day);
        data.append("reservation_time_start", this.reservation_time);
        data.append("notes", "Video/audio Appointment");
        data.append("type", 1);
        data.append("is_web", 1);

        this.addData({
          url: "patient/reservations-two",
          data: data,
        }).then((res) => {
          // redirect to ClientNotifications page
          this.$router.push({
            name: "ClientNotifications",
          });
          // open payment url
          window.open(res.invoice.payment_url, "_blank");
        });
      }
    },

    askReport() {
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("doctor_id", this.$route.params.id);
        if (this.report_files) {
          data.append("attachments[]", this.report_files);
        }
        if (this.image) {
          data.append("rays[]", this.image);
        }
        data.append("notes", this.notes);
        data.append("type", 2);
        data.append("is_web", 1);

        this.addData({
          url: "patient/reservations-two",
          data: data,
        }).then((res) => {
          // redirect to ClientNotifications page
          this.$router.push({
            name: "ClientNotifications",
          });
          // open payment url
          window.open(res.invoice.payment_url, "_blank");
        });
      }
    },

    // handle image
    onAddFile(error, file) {
      console.log("file added", { error, file });
      this.image = file.file;
    },
  },
};
</script>

<style></style>
