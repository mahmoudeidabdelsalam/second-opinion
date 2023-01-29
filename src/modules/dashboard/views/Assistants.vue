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
            المساعدين
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
                          v-model="editedItem.full_name"
                          :rules="nameRules"
                          label="الاسم"
                          outlined
                          dense
                          autofocus
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.email"
                          :rules="emailRules"
                          type="email"
                          label="البريد الالكتروني"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-autocomplete
                          v-model="editedItem.doctors_id"
                          :items="doctors"
                          :rules="selectRules"
                          label="الطبيب"
                          multiple
                          small-chips
                          deletable-chips
                          outlined
                          dense
                        ></v-autocomplete>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.phone_number"
                          :rules="phoneRules"
                          type="tel"
                          label="رقم الهاتف"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          v-model="editedItem.gender"
                          :items="genders"
                          :rules="selectRules"
                          label="النوع"
                          outlined
                          dense
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.national_id"
                          :rules="nationalIdRules"
                          type="number"
                          label="رقم الهوية"
                          outlined
                          dense
                        ></v-text-field>
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

          <!-- export btn -->
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                class="mx-2"
                dark
                depressed
                v-bind="attrs"
                v-on="on"
              >
                تصفية
              </v-btn>
            </template>
            <v-list>
              <v-list-item link @click.prevent="initData('normal')">
                <v-list-item-content>
                  <v-list-item-title>المساعدين</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click.prevent="initData('trashed')">
                <v-list-item-content>
                  <v-list-item-title> المساعدين المحذوفين </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- delete item -->
          <v-dialog persistent v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متاكد من حذف هذا المساعد؟
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

          <!-- restore item -->
          <v-dialog persistent v-model="dialogRestore" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متاكد من استعادة هذا المساعد؟
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" depressed @click="closeRestore">
                  الغاء
                </v-btn>
                <v-btn color="error" depressed @click="restoreItemConfirm">
                  استعادة
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

      <template v-slot:[`item.full_name`]="{ item }">
        <div class="d-flex justify-start align-center">
          <span class="d-block font-weight-medium">
            {{ item.full_name }}
          </span>
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          class="primary--text primary_bg"
          icon
          @click="editItem(item)"
          v-if="!isTrashed"
        >
          <v-icon small color="success">mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          class="primary--text primary_bg mx-2"
          icon
          @click="deleteItem(item)"
          v-if="!isTrashed"
        >
          <v-icon small color="error">mdi-trash-can</v-icon>
        </v-btn>

        <v-btn
          class="primary--text primary_bg mx-2"
          icon
          @click="restoreItem(item)"
          v-if="isTrashed"
        >
          <v-icon small color="error">mdi-restore</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Assistants",

  data: () => ({
    // loading data
    loadingData: false,

    // dialog
    dialog: false,
    dialogDelete: false,
    dialogRestore: false,

    headers: [
      { text: "المساعد", value: "full_name" },
      { text: "البريد الالكترونى", value: "email" },
      { text: "رقم الهاتف", value: "phone_number" },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    // items
    desserts: [],

    // doctors
    doctors: [],

    // genders
    genders: [
      { text: "ذكر", value: "m" },
      { text: "انثى", value: "f" },
    ],

    // search
    search: "",

    // edited item
    editedIndex: -1,

    // edited item
    editedItem: {
      id: "",
      full_name: "",
      email: "",
      doctors_id: "",
      phone_number: "",
      gender: "",
      national_id: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "مساعد جديد" : "تعديل المساعد";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      selectRules: "validationRules/selectRules",
      nationalIdRules: "validationRules/nationalIdRules",
    }),

    // route qquery for trashed
    isTrashed() {
      return this.$route.query.trashed;
    },
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
    this.initData(this.$route.query.trashed || "normal");
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
      showRequsetLoading: "loading/showRequestLoading",
      hideRequsetLoading: "loading/hideRequestLoading",
    }),

    // init data
    initData(dataType) {
      // loading data
      this.loadingData = true;
      // check data type
      if (dataType === "trashed") {
        this.axios
          .get(`dashboard/assistants?removed=only`, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            // hide loading
            this.loadingData = false;
            // set data
            this.desserts = response.data.data;
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });

        // update query params
        this.$router
          .push({
            name: "Assistants",
            query: { trashed: dataType },
          })
          .catch(() => {});
      } else {
        this.axios
          .get(`dashboard/assistants`, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            // hide loading
            this.loadingData = false;
            // set data
            this.desserts = response.data.data;
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });

        // update query params
        this.$router
          .push({
            name: "Assistants",
            query: {},
          })
          .catch(() => {});
      }

      // get doctors
      this.axios
        .get(`dashboard/doctors`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          // set data
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
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // show request loading
      this.showRequsetLoading();

      // get single item data from show api
      this.axios
        .get(`dashboard/assistants/${item.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.editedItem = Object.assign(
            {},
            {
              id: response.data.data.id,
              full_name: response.data.data.full_name,
              email: response.data.data.email,
              doctors_id: response.data.data.doctors.map((item) => item.id),
              phone_number: response.data.data.phone_number,
              national_id: response.data.data.national_id,
              gender: response.data.data.gender,
            }
          );

          // hide request loading
          this.hideRequsetLoading();
        })
        .catch((error) => {
          this.handleResponse(error.response);

          // hide request loading
          this.hideRequsetLoading();
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
        .delete(`dashboard/assistants/${this.editedItem.id}`, {
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

    restoreItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogRestore = true;
    },

    async restoreItemConfirm() {
      // show request loading
      this.showRequsetLoading();

      await this.axios
        .put(
          `dashboard/assistants/${this.editedItem.id}/restore`,
          {},
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .then((response) => {
          this.desserts.splice(this.editedIndex, 1);
          this.handleResponse(response);
          this.closeRestore();

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

    closeRestore() {
      this.dialogRestore = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("full_name", this.editedItem.full_name);
          data.append("email", this.editedItem.email);
          data.append("phone_number", this.editedItem.phone_number);
          for (let i = 0; i < this.editedItem.doctors_id.length; i++) {
            data.append("doctors_id[]", this.editedItem.doctors_id[i]);
          }
          data.append("gender", this.editedItem.gender);
          data.append("national_id", this.editedItem.national_id);
          data.append("_method", "PUT");

          // show request loading
          this.showRequsetLoading();

          await this.axios
            .post(`dashboard/assistants/${this.editedItem.id}`, data, {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            })
            .then((response) => {
              Object.assign(
                this.desserts[this.editedIndex],
                response.data.data
              );
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
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("full_name", this.editedItem.full_name);
          data.append("email", this.editedItem.email);
          data.append("phone_number", this.editedItem.phone_number);
          for (let i = 0; i < this.editedItem.doctors_id.length; i++) {
            data.append("doctors_id[]", this.editedItem.doctors_id[i]);
          }
          data.append("gender", this.editedItem.gender);
          data.append("national_id", this.editedItem.national_id);

          // show request loading
          this.showRequsetLoading();

          await this.axios
            .post(`dashboard/assistants`, data, {
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
  },
};
</script>
