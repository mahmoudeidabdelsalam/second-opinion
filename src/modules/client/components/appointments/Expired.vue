<template>
  <section>
    <v-row v-if="!waitingForData && expired.length > 0">
      <v-col
        cols="12"
        md="6"
        v-for="appointment in expired"
        :key="appointment.id"
      >
        <div class="appointment rounded-lg overflow-hidden">
          <div class="head grey_dark pa-3">
            <div class="m mb-2">
              <v-icon color="white"> mdi-calendar </v-icon>
              <span class="white--text" v-if="appointment.reservation_date">
                {{
                  appointment.reservation_date.day.label +
                  " الموافق " +
                  appointment.reservation_date.day.value +
                  " / " +
                  appointment.reservation_date.month +
                  " - الساعة: " +
                  appointment.reservation_date.time
                }}
              </span>
            </div>
          </div>
          <div class="body grey py-5 px-3">
            <div class="doctor d-flex justify-start align-center mb-4">
              <v-avatar class="mx-2 rounded-lg" size="91">
                <v-img
                  :src="appointment.doctor.profile"
                  :lazy-src="appointment.doctor.profile"
                  cover
                  max-height="90"
                  max-width="90"
                  alt="doctor"
                ></v-img>
              </v-avatar>
              <div class="doctor-info px-2">
                <span class="d-block mb-2 font-weight-bold white--text">
                  {{ appointment.doctor.name }}
                </span>
                <span
                  class="d-block mb-2 font-weight-regular body-2 white--text"
                >
                  {{ appointment.doctor.title }}
                </span>
              </div>
            </div>

            <div class="actions d-flex justify-center align-center">
              <v-dialog
                v-model="invoiceDialog"
                persistent
                transition="dialog-top-transition"
                max-width="800"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="white primary--text py-6 rounded-lg font-weight-bold ma-1"
                    @click="bindInvoiceData(appointment)"
                    style="width: 50%"
                  >
                    مشاهدة الفاتورة
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="text-h6" elevation="0">
                    <v-icon color="primary">mdi-file</v-icon>
                    <span class="mx-4">الفاتورة</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="close">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <div
                      class="head mb-8 d-flex justify-space-between align-start"
                    >
                      <div>
                        <span
                          class="d-block mb-1 font-weight-bold primary--text"
                        >
                          شركة الراى الثانى الطبية
                        </span>
                        <span
                          class="d-block font-weight-bold primary--text text-capitalize"
                        >
                          Second opinion
                        </span>
                      </div>

                      <div>
                        <span
                          class="d-block mb-1 font-weight-bold primary--text"
                        >
                          التاريخ:
                        </span>
                        <span
                          class="d-block font-weight-bold black--text text-capitalize"
                        >
                          {{
                            new Date(appointment.invoice.invoice_due)
                              .toLocaleDateString()
                              .replace(/\//g, "-")
                          }}
                        </span>
                      </div>
                    </div>

                    <div
                      class="body pb-4 d-flex justify-space-between align-start"
                    >
                      <div>
                        <div class="mb-2">
                          <span
                            class="font-weight-bold subtitle-1 primary--text"
                          >
                            الطبيب:
                          </span>
                          <span class="font-weight-regular subtitle-1">
                            {{ appointment.doctor.name }}
                          </span>
                        </div>

                        <div class="mb-2">
                          <span
                            class="font-weight-bold subtitle-1 primary--text"
                          >
                            التخصص:
                          </span>
                          <span class="font-weight-regular subtitle-1">
                            {{ appointment.doctor.department }}
                          </span>
                        </div>

                        <div class="mb-2">
                          <span
                            class="font-weight-bold subtitle-1 primary--text"
                          >
                            ترخيص مزاولة المهنة:
                          </span>
                          <span class="font-weight-regular subtitle-1">
                            {{ appointment.doctor.job_id }}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div class="mb-2">
                          <span
                            class="font-weight-bold subtitle-1 primary--text"
                          >
                            الخدمة:
                          </span>
                          <span class="font-weight-regular subtitle-1">
                            {{ appointment.type.text }}
                          </span>
                        </div>

                        <div class="mb-2">
                          <span
                            class="font-weight-bold subtitle-1 primary--text"
                          >
                            رقم الفاتورة:
                          </span>
                          <span class="font-weight-regular subtitle-1">
                            {{ appointment.id }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <v-divider class="mb-4 primary"></v-divider>

                    <div
                      class="body pb-4 d-flex justify-space-between align-start"
                    >
                      <div>
                        <div class="mb-2">
                          <span
                            class="font-weight-bold subtitle-1 primary--text"
                          >
                            المبلغ:
                          </span>
                          <span class="font-weight-regular subtitle-1">
                            {{ appointment.invoice.sub_total }} ريال
                          </span>
                        </div>

                        <div class="mb-2">
                          <span
                            class="font-weight-bold subtitle-1 primary--text"
                          >
                            ضريبة القيمة المضافة:
                          </span>
                          <span class="font-weight-regular subtitle-1">
                            {{ appointment.invoice.tax }} %
                          </span>
                        </div>

                        <div class="mb-2">
                          <span
                            class="font-weight-bold subtitle-1 primary--text"
                          >
                            الاجمالى:
                          </span>
                          <span class="font-weight-regular subtitle-1">
                            {{ appointment.invoice.total }} ريال
                          </span>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialog"
                persistent
                transition="dialog-top-transition"
                max-width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="white primary--text py-6 rounded-lg font-weight-bold ma-1"
                    @click="rateService(appointment)"
                    style="width: 50%"
                  >
                    تقييم الخدمة
                  </v-btn>
                </template>
                <v-card>
                  <v-toolbar class="text-h6" elevation="0">
                    <v-icon color="primary">mdi-star-outline</v-icon>
                    <span class="mx-4">تقييم الخدمة</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="close">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <v-form ref="form" :v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="12" class="text-center">
                            <v-rating
                              v-model="rateForm.rating"
                              color="yellow darken-3"
                              background-color="grey darken-1"
                              empty-icon="$ratingFull"
                              half-increments
                              hover
                              large
                              dir="rtl"
                            ></v-rating>
                          </v-col>

                          <v-col cols="12">
                            <v-textarea
                              v-model="rateForm.comment"
                              :rules="descriptionRules"
                              label="ملاحظات"
                              outlined
                              dense
                              auto-grow
                              rows="4"
                              hide-details="true"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      block
                      class="primary py-6 rounded-lg"
                      :loading="loading1"
                      :disabled="loading1"
                      @click="confirmRate"
                    >
                      تقييم الخدمة
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- waiting for data -->
    <v-skeleton-loader
      v-if="waitingForData && expired.length == 0"
      max-width="300"
      type="card"
    ></v-skeleton-loader>

    <!-- no data -->
    <div
      v-if="!waitingForData && expired.length == 0"
      class="d-flex flex-column align-center justify-center"
    >
      <v-avatar class="mb-5" size="120">
        <v-img
          :src="require('@/assets/images/pen-no-data.webp')"
          :lazy-src="require('@/assets/images/pen-no-data.webp')"
          cover
        ></v-img>
      </v-avatar>
      <span class="d-block font-weight-bold primary--text">
        ليس لديك مواعيد منتهية
      </span>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Expired",

  props: {
    expired: {
      type: Array,
      default: () => [],
    },

    waitingForData: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    // buttons loading
    loading1: false,

    // dialogs
    dialog: false,

    // invoice dialog
    invoiceDialog: false,

    editedIndex: -1,

    editedItem: {},

    defaultItem: {},

    // rate form
    rateForm: {
      rating: 4.5,
      comment: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      descriptionRules: "validationRules/descriptionRules",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    rateService(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, { item });
      this.dialog = true;
    },

    confirmRate() {
      // Object.assign(this.expired[this.editedIndex], this.editedItem);

      if (this.rateForm.comment) {
        let data = new FormData();
        data.append("rating", this.rateForm.rating);
        data.append("comment", this.rateForm.comment);

        // show loading1
        this.loading1 = true;

        this.axios
          .post(`patient/reservations/${this.editedIndex}/review`, data)
          .then((response) => {
            this.handleResponse(response);

            // hide loading1
            this.loading1 = false;

            // close dialog
            this.close();
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide loading1
            this.loading1 = false;
          });
      }
    },

    bindInvoiceData(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, { item });
      this.invoiceDialog = true;
    },

    close() {
      this.dialog = false;
      this.invoiceDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
