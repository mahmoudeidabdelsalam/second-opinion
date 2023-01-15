<template>
  <v-card flat>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="id"
      sort-by="id"
      sort-desc
      no-data-text="No patients."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="black--text font-weight-medium">
            Patients
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- delete item -->
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                Are you sure you want to delete this patient?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" depressed small @click="closeDelete">
                  Cancel
                </v-btn>
                <v-btn color="error" depressed small @click="deleteItemConfirm">
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <span class="d-block black--text font-weight-bold">
          {{ item.full_name }}
        </span>
      </template>

      <template v-slot:[`item.contacts`]="{ item }">
        <span class="d-block black--text">
          {{ item.email }}
        </span>
        <span class="d-block black--text">
          {{ item.phone_number }}
        </span>
      </template>

      <template v-slot:[`item.info`]="{ item }">
        <span class="d-block black--text">
          Gender: {{ item.gender.text }}
        </span>
        <span class="d-block black--text"> Age: {{ item.age }} </span>
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
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Patients",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogRestore: false,
    headers: [
      { text: "Patient", value: "name", sortable: false },
      { text: "Contacts", value: "contacts", sortable: false },
      { text: "Info", value: "info", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    // genders
    genders: [
      { text: "Male", value: "m" },
      { text: "Female", value: "f" },
    ],
    // selected rows
    singleSelect: false,
    selected: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      national_id: "",
      gender: "",
      birthday: "",
    },
    defaultItem: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      national_id: "",
      gender: "",
      birthday: "",
    },
    // date picker
    menu: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Patient" : "Edit Patient";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      selectRules: "validationRules/selectRules",
      numberRules: "validationRules/numberRules",
      nationalIdRules: "validationRules/nationalIdRules",
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
        // get patients
        this.getData("dashboard/patients").then((res) => {
          this.desserts = res;
        });

        this.loaded = true;
      }, 0);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.getData(`dashboard/patients/${item.id}`).then((res) => {
        this.editedItem = Object.assign(
          {},
          {
            id: res.id,
            first_name: res.first_name,
            last_name: res.last_name,
            email: res.email,
            phone_number: res.phone_number,
            national_id: res.national_id,
            gender: res.gender.value,
            birthday: res.birthday,
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
        url: "dashboard/patients",
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
        data.append("first_name", this.editedItem.first_name);
        data.append("last_name", this.editedItem.last_name);
        data.append("email", this.editedItem.email);
        data.append("phone_number", this.editedItem.phone_number);
        data.append("birthday", this.editedItem.birthday);
        data.append("gender", this.editedItem.gender);
        data.append("national_id", this.editedItem.national_id);
        data.append("_method", "PUT");

        await this.updateData({
          url: `dashboard/patients/${this.editedItem.id}`,
          data: data,
        }).then((res) => {
          Object.assign(this.desserts[this.editedIndex], res);
          this.close();
        });
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("first_name", this.editedItem.first_name);
          data.append("last_name", this.editedItem.last_name);
          data.append("email", this.editedItem.email);
          data.append("phone_number", this.editedItem.phone_number);
          data.append("birthday", this.editedItem.birthday);
          data.append("gender", this.editedItem.gender);
          data.append("national_id", this.editedItem.national_id);

          this.addData({
            url: "dashboard/patients",
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

<style></style>
