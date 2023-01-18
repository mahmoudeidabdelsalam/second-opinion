<template>
  <transition name="slide-fade" v-if="loaded">
    <section class="data-table-page white rounded-lg pa-5">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
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
            <v-toolbar-title class="black--text font-weight-bold">
              الفواتير
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:[`item.patient`]="{ item }">
          <span class="d-block black--text font-weight-bold">
            {{ item.patient.full_name }}
          </span>
          <span class="d-block black--text">
            {{ item.patient.email }}
          </span>
          <span class="d-block black--text">
            {{ item.patient.phone_number }}
          </span>
        </template>

        <template v-slot:[`item.sub_total`]="{ item }">
          <span class="d-block black--text font-weight-bold">
            {{ item.sub_total + " " + item.currency }}
          </span>
        </template>

        <template v-slot:[`item.total`]="{ item }">
          <span class="d-block black--text font-weight-bold">
            {{ item.total + " " + item.currency }}
          </span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="primary--text primary_bg" icon @click="editItem(item)">
            <v-icon small color="success">mdi-pencil</v-icon>
          </v-btn>

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
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Invoices",

  data: () => ({
    loaded: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "المرضى", value: "patient", sortable: false },
      { text: "نوع الخدمة", value: "invoice_type" },
      { text: "حالة الخدمة", value: "status" },
      { text: "حالة الدفع", value: "is_paid" },
      { text: "دُفع فى", value: "invoice_paid_at" },
      { text: "الاجمالى الفرعى", value: "sub_total" },
      { text: "الاجمالى النهائى", value: "total" },
      // { text: "الاجراءات", value: "actions", sortable: false },
    ],
    desserts: [],
    // selected rows
    singleSelect: false,
    selected: [],
    editedIndex: -1,
    editedItem: {
      id: "",
    },
    defaultItem: {
      id: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Invoice" : "Edit Invoice";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      descriptionRules: "validationRules/descriptionRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
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
    }),

    // init data
    initData() {
      setTimeout(() => {
        // get invoices
        this.getData("dashboard/invoices").then((res) => {
          this.desserts = res;
        });

        this.loaded = true;
      }, 0);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.getData(`dashboard/invoices/${item.id}`).then((res) => {
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
        url: "dashboard/invoices",
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

    async save() {
      if (this.editedIndex > -1) {
        let data = new FormData();

        data.append("_method", "PUT");

        await this.updateData({
          url: `dashboard/invoices/${this.editedItem.id}`,
          data: data,
        }).then((res) => {
          Object.assign(this.desserts[this.editedIndex], res);
          this.close();
        });
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();

          this.addData({
            url: "dashboard/invoices",
            data: data,
          }).then((res) => {
            console.log(res);
            this.desserts.unshift(res);
          });

          this.close();
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
