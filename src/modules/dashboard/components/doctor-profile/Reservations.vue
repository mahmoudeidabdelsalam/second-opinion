<template>
  <v-card flat>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="id"
      sort-by="id"
      sort-desc
      no-data-text="لا توجد بيانات حتى الان"
      :footer-props="{
        'items-per-page-all-text': 'الكل',
        'items-per-page-text': 'عدد الصفوف في الصفحة',
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="primary--text font-weight-bold">
            الحجوزات
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- delete item -->
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متأكد من حذف الحجز؟
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
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Reservations",

  data: () => ({
    // dialog
    dialogDelete: false,

    headers: [
      { text: "المريض", value: "patient", sortable: false },
      { text: "تاريخ الحجز", value: "time", sortable: false },
      { text: "نوع الحجز", value: "type.text" },
      {
        text: "الحالة",
        value: "status",
        width: "210",
        sortable: false,
      },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    desserts: [],

    // status
    status: [
      { text: "فى الانتظار", value: 0 },
      { text: "مؤكدة", value: 1 },
      { text: "ملغية", value: 2 },
      { text: "منتهية", value: 3 },
      { text: "منتهية الصلاحية", value: 4 },
      { text: "استعادة الاموال", value: 5 },
    ],
  }),

  computed: {
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
      deleteData: "crudOperations/deleteData",
    }),

    // init data
    initData() {
      // get reservations
      this.getData("dashboard/reservations").then((res) => {
        this.desserts = res;
      });
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
  },
};
</script>

<style lang="scss"></style>
