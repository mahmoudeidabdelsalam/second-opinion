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
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="black--text font-weight-bold">
            الصلاحيات
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog persistent scrollable v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <!-- new item btn -->
              <v-btn color="primary" dark depressed v-bind="attrs" v-on="on">
                <v-icon left>mdi-plus</v-icon>
                جديد
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="elevation-2">
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text class="py-4">
                <v-form ref="form" :v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.name_en"
                          :rules="nameRules"
                          label="الاسم باللغة الانجليزية"
                          outlined
                          dense
                          autofocus
                          dir="ltr"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.name_ar"
                          :rules="nameRules"
                          label="الاسم باللغة العربية"
                          outlined
                          dense
                          dir="rtl"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-for="permission in permissions"
                        :key="permission.id"
                      >
                        <v-checkbox
                          v-model="editedItem.permissions"
                          :label="permission.name"
                          :value="permission.id"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" depressed @click="close">
                  الغاء
                </v-btn>
                <v-btn color="primary" depressed @click="save"> حفظ </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- delete item -->
          <v-dialog persistent v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متاكد من حذف هذة الصلاحية ؟
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" depressed @click="closeDelete">
                  الغاء
                </v-btn>
                <v-btn color="error" depressed @click="deleteItemConfirm">
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
        <span class="d-block font-weight-medium">
          {{ item.name }}
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Roles",

  data: () => ({
    // loading data
    loadingData: false,

    // dialog
    dialog: false,
    dialogDelete: false,

    headers: [
      { text: "الصلاحيات", value: "name" },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    // items
    desserts: [],

    // permissions
    permissions: [],

    // search
    search: "",

    // edited item
    editedIndex: -1,

    // edited item
    editedItem: {
      id: "",
      name_en: "",
      name_ar: "",
      permissions: [],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "صلاحية جديدة" : "تعديل الصلاحية";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
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
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      // loading data
      this.loadingData = true;

      // get roles
      this.axios
        .get(`dashboard/roles`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.desserts = response.data.data;
          this.loadingData = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });

      // get permissions
      this.axios
        .get(`dashboard/permissions`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.permissions = response.data.data;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.axios
        .get(`dashboard/roles/${item.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.editedItem = Object.assign(
            {},
            {
              id: response.data.data.id,
              name_en: response.data.data.en.display_name,
              name_ar: response.data.data.ar.display_name,
              permissions: response.data.data.permissions.map(
                (item) => item.id
              ),
            }
          );
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.axios
        .delete(`dashboard/roles/${this.editedItem.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.desserts.splice(this.editedIndex, 1);
          this.handleResponse(response);
          this.closeDelete();
        })
        .catch((error) => {
          this.handleResponse(error.response);
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
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("name:en", this.editedItem.name_en);
          data.append("name:ar", this.editedItem.name_ar);
          for (let i = 0; i < this.editedItem.permissions.length; i++) {
            data.append("permissions[]", this.editedItem.permissions[i]);
          }
          data.append("_method", "PUT");

          await this.axios
            .post(`dashboard/roles/${this.editedItem.id}`, data, {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            })
            .then((response) => {
              Object.assign(
                this.desserts[this.editedIndex],
                response.data.data
              );
              this.handleResponse(response);
              this.close();
            })
            .catch((error) => {
              this.handleResponse(error.response);
            });
        }
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("name:en", this.editedItem.name_en);
          data.append("name:ar", this.editedItem.name_ar);
          for (let i = 0; i < this.editedItem.permissions.length; i++) {
            data.append("permissions[]", this.editedItem.permissions[i]);
          }

          await this.axios
            .post(`dashboard/roles`, data, {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            })
            .then((response) => {
              this.desserts.unshift(response.data.data);
              this.handleResponse(response);
              this.close();
            })
            .catch((error) => {
              this.handleResponse(error.response);
            });
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
