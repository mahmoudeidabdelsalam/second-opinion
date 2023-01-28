<template>
  <section>
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

    <v-form ref="form" :v-model="valid" class="mb-10" v-if="showReportForm">
      <!-- <v-textarea
                v-model="notes"
                label="اكتب ملاحظاتك ..."
                outlined
                dense
                auto-grow
                rows="4"
              ></v-textarea> -->

      <v-file-input
        v-model="report_files"
        label="ارفق ملف"
        placeholder="اختر الملفات"
        prepend-icon="mdi-paperclip"
        outlined
        multiple
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
  </section>
</template>

<script>
import { mapActions } from "vuex";

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
  name: "WrittenReservaition",

  components: {
    FilePond,
  },

  data: () => ({
    valid: true,
    showReportForm: false,
    notes: "",
    report_files: [],
    image: null,
  }),

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    askReport() {
      if (this.$refs.form.validate()) {
        let data = new FormData();
        data.append("doctor_id", this.$route.params.id);
        if (this.report_files) {
          for (let i = 0; i < this.report_files.length; i++) {
            data.append("attachments[]", this.report_files[i]);
          }
        }
        if (this.image) {
          data.append("rays[]", this.image);
        }
        // data.append("notes", this.notes);
        data.append("type", 2);
        data.append("is_web", 1);

        this.axios
          .post(`patient/reservations-two`, data, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            // redirect to ClientNotifications page
            this.$router.push({
              name: "ClientNotifications",
            });
            // open payment url
            window.open(response.data.data.invoice.payment_url, "_blank");
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });
      }
    },

    // handle image
    onAddFile(_, file) {
      console.log(file.file);
      this.image = file.file;
    },
  },
};
</script>

<style></style>