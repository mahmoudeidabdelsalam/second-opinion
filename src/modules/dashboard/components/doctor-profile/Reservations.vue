<template>
  <v-card flat>
    <section class="data-table-page white rounded-lg pa-5">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
        item-key="id"
        sort-by="id"
        sort-desc
        no-data-text="No reservations."
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="black--text font-weight-medium">
              Reservations
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- delete item -->
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h6">
                  Are you sure you want to delete this reservation?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary" depressed small @click="closeDelete">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="error"
                    depressed
                    small
                    @click="deleteItemConfirm"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <span class="d-block black--text font-weight-bold">
            {{ item.name }}
          </span>
        </template>

        <template v-slot:[`item.patient`]="{ item }">
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

        <template v-slot:[`item.time`]="{ item }">
          <span class="d-block black--text">
            Day: {{ item.reservation_day }}
          </span>
          <span class="d-block black--text">
            Start in: {{ item.reservation_time_start }}
          </span>
          <span class="d-block black--text">
            End in: {{ item.reservation_time_end }}
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
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Reservations",

  data: () => ({
    loaded: false,
    dialog: false,
    dialogDelete: false,
    dialogRestore: false,
    headers: [
      { text: "Patient", value: "patient", sortable: false },
      { text: "Time", value: "time", sortable: false },
      { text: "Type", value: "type.text" },
      {
        text: "Status",
        value: "status",
        width: "150",
        align: "center",
        sortable: false,
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    // doctors
    doctors: [],
    // patients
    patients: [],
    // available times
    availableTimes: [],
    // genders
    genders: [
      { text: "Male", value: "m" },
      { text: "Female", value: "f" },
    ],
    // status
    status: [
      { text: "Pending", value: 0 },
      { text: "Confirmed", value: 1 },
      { text: "Cancelled", value: 2 },
      { text: "Completed", value: 3 },
      { text: "Expired", value: 4 },
      { text: "Refunded", value: 5 },
    ],
    // reservationTypes
    reservationTypes: [
      { text: "Visit", value: 0 },
      { text: "Call", value: 1 },
      { text: "Video", value: 2 },
      { text: "Home nurse", value: 3 },
    ],
    // selected rows
    singleSelect: false,
    selected: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      doctor_id: "",
      patient_id: "",
      reservation_day: "",
      reservation_time_start: "",
      type: "",
    },
    defaultItem: {
      id: "",
      doctor_id: "",
      patient_id: "",
      reservation_day: "",
      reservation_time_start: "",
      type: "",
    },
    // date picker
    menu: false,

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
      setTimeout(() => {
        // get reservations
        this.getData("dashboard/reservations").then((res) => {
          this.desserts = res;
        });

        this.loaded = true;

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
              text: item.full_name,
              value: item.id,
            };
          });
        });
      }, 0);
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
            console.log(res);
            this.desserts.unshift(res);

            this.close();
          });
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>