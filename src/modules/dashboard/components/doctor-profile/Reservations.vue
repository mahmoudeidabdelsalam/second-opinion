<template>
  <v-card flat>
    <v-data-table
      :headers="headers"
      :items="reservations"
      :loading="loadingData"
      :search="search"
      loading-text="جاري تحميل البيانات"
      no-data-text="لا توجد بيانات حتى الان"
      :footer-props="{
        'items-per-page-all-text': 'الكل',
        'items-per-page-text': 'عدد الصفوف في الصفحة',
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="black--text font-weight-bold">
            الحجوزات
          </v-toolbar-title>
          <v-spacer></v-spacer>
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
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Reservations",

  props: {
    reservations: {
      type: Array,
      default: () => [],
    },
  },

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
    ],

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
  }),

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // change item status
    async changeStatus(item, event) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);

      let data = new FormData();
      data.append("status", event);
      data.append("_method", "PUT");

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
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>
