<template>
  <section class="data-table-page white rounded-lg pa-5">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="loadingData"
      loading-text="جاري تحميل البيانات"
      no-data-text="لا توجد بيانات حتى الان"
      no-results-text="لا توجد نتائج مطابقة للبحث"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="black--text font-weight-bold">
            الحجوزات
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog persistent v-model="dialog" max-width="800px" scrollable>
            <template v-slot:activator="{ on, attrs }">
              <!-- new item btn -->
              <v-btn color="primary" dark depressed v-bind="attrs" v-on="on">
                <v-icon left>mdi-plus</v-icon>
                جديد
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" :v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-autocomplete
                          v-model="editedItem.doctor_id"
                          :items="doctors"
                          :rules="selectRules"
                          label="الطبيب"
                          outlined
                          dense
                        ></v-autocomplete>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.reservation_day"
                              label="تاريح الحجز"
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
                            v-model="editedItem.reservation_day"
                            :min="minDate"
                            :max="maxDate"
                            scrollable
                            @input="menu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12">
                        <v-btn
                          depressed
                          class="capitalize mb-5 primary_bg primary--text"
                          @click="getAvailableDates"
                        >
                          معرفة الاوقات المتاحة
                        </v-btn>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                        v-if="showInpust && availableTimes"
                      >
                        <v-autocomplete
                          v-model="editedItem.patient_id"
                          :items="patients"
                          :rules="selectRules"
                          label="المريض"
                          outlined
                          dense
                        ></v-autocomplete>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                        v-if="showInpust && availableTimes"
                      >
                        <v-autocomplete
                          v-model="editedItem.reservation_time_start"
                          :items="availableTimes"
                          :rules="selectRules"
                          label="التوقيت"
                          outlined
                          dense
                        ></v-autocomplete>
                      </v-col>

                      <v-col
                        cols="12"
                        md="6"
                        v-if="showInpust && availableTimes"
                      >
                        <v-autocomplete
                          v-model="editedItem.type"
                          :items="reservationTypes"
                          label="نوع الحجز"
                          outlined
                          dense
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" depressed small @click="close">
                  الغاء
                </v-btn>
                <v-btn
                  color="primary"
                  depressed
                  small
                  @click="save"
                  v-if="showInpust && availableTimes"
                >
                  حفظ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- delete item -->
          <v-dialog persistent v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متاكد من حذف الحجز ؟
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" depressed small @click="closeDelete">
                  الغاء
                </v-btn>
                <v-btn color="error" depressed small @click="deleteItemConfirm">
                  حذف
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <v-text-field
          v-model="search"
          @keyup="searchData"
          append-icon="mdi-magnify"
          label="بحث"
          single-line
          hide-details
          outlined
          dense
          class="mb-5 rounded-lg"
          style="max-width: 500px"
        ></v-text-field>
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <span class="d-block black--text font-weight-bold">
          {{ item.name }}
        </span>
      </template>

      <template v-slot:[`item.patient.full_name`]="{ item }">
        <div class="py-1 px-5 rounded-xl clickable-row-item" @click="goToReservationProfile(item.id)"
        >
          <span
          class="d-block font-weight-medium"
          v-if="item.patient && item.patient.full_name"
        >
          {{ item.patient.full_name }}
        </span>
        <span class="d-block" v-if="item.patient && item.patient.email">
          {{ item.patient.email }}
        </span>
        <span class="d-block" v-if="item.patient && item.patient.phone_number">
          {{ item.patient.phone_number }}
        </span>
        </div>
      </template>

      <template v-slot:[`item.doctor.full_name`]="{ item }">
        <div class="d-flex justify-start align-center">
          <v-avatar size="50">
            <v-img
              cover
              :lazy-src="item.doctor.profile"
              max-height="50"
              max-width="50"
              :src="item.doctor.profile"
              :alt="item.doctor.full_name"
              v-if="item.doctor && item.doctor.profile"
            ></v-img>
          </v-avatar>
          <div class="px-4">
            <span
              class="d-block font-weight-medium"
              v-if="item.doctor && item.doctor.full_name"
            >
              {{ item.doctor.full_name }}
            </span>
            <span class="d-block" v-if="item.doctor && item.doctor.email">
              {{ item.doctor.email }}
            </span>
            <span class="d-block" v-if="item.doctor && item.doctor.work_phone">
              {{ item.doctor.work_phone }}
            </span>
          </div>
        </div>
      </template>

      <template v-slot:[`item.time`]="{ item }">
        <span class="d-block" v-if="item.reservation_date">
          اليوم:
          {{
            item.reservation_date.day.label +
            ", " +
            item.reservation_date.day.value
          }}
        </span>
        <span class="d-block" v-if="item.reservation_date">
          التوقيت: {{ item.reservation_date.time }}
        </span>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-select
          class="pt-5"
          :items="status"
          :value="item.status"
          outlined
          dense
          @change="changeStatus(item, $event)"
        ></v-select>
      </template>

      <template v-slot:[`item.created_by`]="{ item }">
        <span class="d-block">
          {{ item.created_by }}
        </span>
      </template>

      <template v-slot:[`item.session.start_url`]="{ item }">
        <v-btn
          v-if="item.session && item.session.start_url"
          depressed
          icon
          :class="
            'primary_bg pa-6 bounce' + (item.session.start_url ? '' : ' grey-disabled')
          "
          title="ابدا الاستشارة"
          link
          :href="item.session.start_url"
          target="_blank"
          :disabled="!item.session.start_url"
        >
          <v-avatar size="30">
            <v-img
              :src="require('@/assets/images/zoom.webp')"
              :lazy-src="require('@/assets/images/zoom.webp')"
              cover
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-btn class="primary--text primary_bg" icon @click="editItem(item)">
            <v-icon small color="success">mdi-pencil</v-icon>
          </v-btn> -->

        <v-btn
          class="primary--text primary_bg mx-2"
          icon
          @click="deleteItem(item)"
        >
          <v-icon small color="error">mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- pagination -->
    <div class="text-center py-10" v-if="desserts.length">
      <v-pagination
        v-model="pageNumber"
        :length="lastPage"
        :total-visible="5"
        @input="initData"
      ></v-pagination>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Reservations",

  data: () => ({
    // loading data
    loadingData: false,

    // dialog
    dialog: false,
    dialogDelete: false,

    headers: [
      { text: "المريض", value: "patient.full_name", width: "250" },
      { text: "الطبيب", value: "doctor.full_name", width: "250" },
      { text: "تاريخ الحجز", value: "time", sortable: false },
      { text: "نوع الحجز", value: "type.text" },
      {
        text: "الحالة",
        value: "status",
        width: "210",
        sortable: false,
      },
      { text: "طريقة الحجز", value: "created_by" },
      { text: "بدا الاستشارة", value: "session.start_url", align: "center" },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    // items
    desserts: [],

    // page number
    pageNumber: 1,

    // last page
    lastPage: 1,

    // doctors
    doctors: [],

    // patients
    patients: [],

    // available times
    availableTimes: [],

    // genders
    genders: [
      { text: "ذكر", value: "m" },
      { text: "انثى", value: "f" },
    ],

    // status
    status: [
      { text: "مفتوح", value: 1 },
      { text: "ملغى", value: 2 },
      { text: "مكتمل", value: 3 },
      { text: "مبلغ مسترد", value: 5 },
    ],

    // reservationTypes
    reservationTypes: [
      { text: "استشارة صوتية/مرئية", value: 1 },
      { text: "استشارة كتابية", value: 2 },
    ],

    // search
    search: "",
    searchTimeout: null,

    // edited index
    editedIndex: -1,

    // edited item
    editedItem: {
      id: "",
      doctor_id: "",
      patient_id: "",
      reservation_day: "",
      reservation_time_start: "",
      type: "",
    },

    // date picker
    menu: false,

    // show inputs
    showInpust: false,

    // min date
    minDate: new Date().toISOString().substr(0, 10),

    // max date 7 days
    maxDate: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .substr(0, 10),
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "حجز جديد" : "تعديل الحجز";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      selectRules: "validationRules/selectRules",
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },

    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    // init data
    this.initData();
  },

  mounted() {
    setTimeout(() => {
      // get reservations
      this.axios
        .get(`dashboard/reservations?page=${this.pageNumber}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          // hide loading
          this.loadingData = false;

          //set last page
          this.lastPage = response.data.meta.last_page;

          // set data
          this.desserts = response.data.data;
        })
        .catch((error) => {
          this.handleResponse(error.response);

          // hide loading
          this.loadingData = false;
        });
    }, 300000);
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
      showRequsetLoading: "loading/showRequestLoading",
      hideRequsetLoading: "loading/hideRequestLoading",
    }),

    // init data
    initData() {
      // loading data
      this.loadingData = true;

      // get reservations
      this.axios
        .get(`dashboard/reservations`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.desserts = response.data.data;
          this.loadingData = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });

      // get doctors
      this.axios
        .get(`dashboard/doctors`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.doctors = response.data.data.map((item) => {
            return {
              text: item.full_name,
              value: item.id,
            };
          });
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });

      // get patients
      this.axios
        .get(`dashboard/patients`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.patients = response.data.data.map((item) => {
            return {
              text: item.name,
              value: item.id,
            };
          });
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },

    // search data
    searchData() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        // show loading
        this.loadingData = true;

        this.axios
          .get(`dashboard/reservations?search=${this.search}`, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            // hide loading
            this.loadingData = false;

            //set last page
            this.lastPage = response.data.meta.last_page;

            // set data
            this.desserts = response.data.data;
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide loading
            this.loadingData = false;
          });
      }, 1000);
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // show request loading
      this.showRequsetLoading();

      this.axios
        .delete(`dashboard/reservations/${this.editedItem.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.desserts.splice(this.editedIndex, 1);
          this.handleResponse(response);
          this.closeDelete();

          // hide request loading
          this.hideRequsetLoading();
        })
        .catch((error) => {
          this.handleResponse(error.response);

          // hide request loading
          this.hideRequsetLoading();
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      // reset form validation
      this.$refs.form.resetValidation();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // change item status
    async changeStatus(item, event) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);

      let data = new FormData();
      data.append("status", event);
      data.append("_method", "PUT");

      // show request loading
      this.showRequsetLoading();

      await this.axios
        .post(
          `dashboard/reservations/${this.editedItem.id}/update-status`,
          data,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .then((response) => {
          Object.assign(this.desserts[this.editedIndex], response.data.data);
          this.handleResponse(response);
          this.close();

          // hide request loading
          this.hideRequsetLoading();
        })
        .catch((error) => {
          this.handleResponse(error.response);

          // hide request loading
          this.hideRequsetLoading();
        });
    },

    // get available dates
    async getAvailableDates() {
      let data = new FormData();
      data.append("doctor_id", this.editedItem.doctor_id);
      data.append("reservation_day", this.editedItem.reservation_day);

      // show request loading
      this.showRequsetLoading();

      await this.axios
        .post(`dashboard/reservations/get-available-dates`, data, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.availableTimes = response.data.data;
          this.handleResponse(response);
          this.showInpust = true;

          // hide request loading
          this.hideRequsetLoading();
        })
        .catch((error) => {
          this.handleResponse(error.response);

          // hide request loading
          this.hideRequsetLoading();
        });
    },

    async save() {
      if (this.editedIndex > -1) {
        if (this.$refs.form.validate()) {
          console.log("save data");
        }
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("doctor_id", this.editedItem.doctor_id);
          data.append("reservation_day", this.editedItem.reservation_day);
          data.append("patient_id", this.editedItem.patient_id);
          data.append(
            "reservation_time_start",
            this.editedItem.reservation_time_start
          );
          data.append("type", this.editedItem.type);

          // show request loading
          this.showRequsetLoading();

          await this.axios
            .post(`dashboard/reservations`, data, {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            })
            .then((response) => {
              this.desserts.unshift(response.data.data);
              this.handleResponse(response);
              this.close();

              // hide request loading
              this.hideRequsetLoading();
            })
            .catch((error) => {
              this.handleResponse(error.response);

              // hide request loading
              this.hideRequsetLoading();
            });
        }
      }
    },

    // go to reservations profile
    goToReservationProfile( itemId ) {
      this.$router.push({
        name: "ReservationProfile",
        params: { id: itemId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bounce {
  animation: bounce 1s infinite alternate;

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
  }
}
.grey-disabled {
  // grey scale
  filter: grayscale(100%) !important;
}
</style>
