<template>
  <section class="data-table-page white rounded-lg pa-5">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="loadingData"
      :search="search"
      loading-text="جاري تحميل البيانات"
      no-data-text="لا توجد بيانات حتى الان"
      :footer-props="{
        'items-per-page-all-text': 'الكل',
        'items-per-page-text': 'عدد الصفوف في الصفحة',
      }"
      @dblclick:row="goToReservationProfile"
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
                <v-form ref="form" :v-model="valid" lazy-validation>
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
        <span
          class="d-block black--text font-weight-bold"
          v-if="item.patient && item.patient.full_name"
        >
          {{ item.patient.full_name }}
        </span>
        <span
          class="d-block black--text"
          v-if="item.patient && item.patient.email"
        >
          {{ item.patient.email }}
        </span>
        <span
          class="d-block black--text"
          v-if="item.patient && item.patient.phone_number"
        >
          {{ item.patient.phone_number }}
        </span>
        <span
          class="d-block black--text"
          v-if="item.patient && item.patient.gender"
        >
          {{ item.patient.gender }}
        </span>
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
              class="d-block black--text font-weight-bold"
              v-if="item.doctor && item.doctor.full_name"
            >
              {{ item.doctor.full_name }}
            </span>
            <span
              class="d-block black--text"
              v-if="item.doctor && item.doctor.email"
            >
              {{ item.doctor.email }}
            </span>
            <span
              class="d-block black--text"
              v-if="item.doctor && item.doctor.work_phone"
            >
              {{ item.doctor.work_phone }}
            </span>
          </div>
        </div>
      </template>

      <template v-slot:[`item.time`]="{ item }">
        <span class="d-block black--text" v-if="item.reservation_date">
          اليوم:
          {{
            item.reservation_date.day.label +
            ", " +
            item.reservation_date.day.value
          }}
        </span>
        <span class="d-block black--text" v-if="item.reservation_date">
          التوقيت: {{ item.reservation_date.time }}
        </span>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-select
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
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    desserts: [],

    // search
    search: "",

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
      { text: "فى الانتظار", value: 0 },
      { text: "مؤكدة", value: 1 },
      { text: "ملغية", value: 2 },
      { text: "منتهية", value: 3 },
      { text: "منتهية الصلاحية", value: 4 },
      { text: "استعادة الاموال", value: 5 },
    ],

    // reservationTypes
    reservationTypes: [
      { text: "استشارة صوتية/مرئية", value: 1 },
      { text: "استشارة كتابية", value: 2 },
    ],

    editedIndex: -1,

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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Reservation" : "Edit Reservation";
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

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
      addData: "crudOperations/addData",
      updateData: "crudOperations/updateData",
      deleteData: "crudOperations/deleteData",
      updateStatus: "crudOperations/updateStatus",
      checkAvailableDates: "crudOperations/checkAvailableDates",
    }),

    // init data
    initData() {
      // loading data
      this.loadingData = true;
      // get reservations
      this.getData("dashboard/reservations").then((res) => {
        // hide loading
        this.loadingData = false;
        // set data
        this.desserts = res;
      });

      // get doctors
      this.getData("dashboard/doctors").then((res) => {
        this.doctors = res.map((item) => {
          return {
            text: item.full_name,
            value: item.id,
          };
        });
      });

      // get patients
      this.getData("dashboard/patients").then((res) => {
        this.patients = res.map((item) => {
          return {
            text: item.name,
            value: item.id,
          };
        });
      });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.getData(`dashboard/reservations/${item.id}`).then((res) => {
        this.editedItem = Object.assign(
          {},
          {
            id: res.id,
          }
        );
      });

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteData({
        url: "dashboard/reservations",
        id: this.editedItem.id,
      }).then(() => {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
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
    changeStatus(item, event) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);

      let data = new FormData();
      data.append("status", event);
      data.append("_method", "PUT");

      this.updateStatus({
        url: "dashboard/reservations",
        id: this.editedItem.id,
        data: data,
      }).then((res) => {
        Object.assign(this.desserts[this.editedIndex], res);
      });
    },

    // get available dates
    getAvailableDates() {
      let data = new FormData();

      data.append("doctor_id", this.editedItem.doctor_id);
      data.append("reservation_day", this.editedItem.reservation_day);

      this.addData({
        url: "dashboard/reservations/get-available-dates",
        data: data,
      }).then((res) => {
        this.availableTimes = res;
        this.showInpust = true;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        if (this.$refs.form.validate()) {
          let data = new FormData();

          data.append("name:en", this.editedItem.en_name);
          data.append("name:ar", this.editedItem.ar_name);

          data.append("_method", "PUT");

          await this.updateData({
            url: `dashboard/reservations/${this.editedItem.id}`,
            data: data,
          }).then((res) => {
            Object.assign(this.desserts[this.editedIndex], res);
            this.close();
          });
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

          this.addData({
            url: "dashboard/reservations",
            data: data,
          }).then((res) => {
            this.desserts.unshift(res);
            this.close();
          });
        }
      }
    },

    // go to reservations profile
    goToReservationProfile(event, { item }) {
      this.$router.push({
        name: "DoctorProfile",
        params: { id: item.id },
      });
    },
  },
};
</script>

<style lang="scss"></style>
