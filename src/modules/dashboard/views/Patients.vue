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
            المرضى
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
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.name"
                          :rules="nameRules"
                          label="الاسم بالكامل"
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
                        <v-text-field
                          v-model="editedItem.phone_number"
                          :rules="phoneRules"
                          type="tel"
                          label="رقم الهاتف"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.national_id"
                          :rules="nationalIdRules"
                          type="number"
                          label="رقم الهوية"
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
                              v-model="editedItem.birthday"
                              label="تاريخ الميلاد"
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
                            v-model="editedItem.birthday"
                            :max="maxDate"
                            scrollable
                            :active-picker.sync="activePicker"
                            @input="menu = false"
                          ></v-date-picker>
                        </v-menu>
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
                هل انت متاكد من حذف المريض؟
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
        <span class="d-block font-weight-medium">
          {{ item.name }}
        </span>
      </template>

      <template v-slot:[`item.email`]="{ item }">
        <span class="d-block">
          {{ item.email }}
        </span>
      </template>

      <template v-slot:[`item.phone_number`]="{ item }">
        <span class="d-block">
          {{ item.phone_number }}
        </span>
      </template>

      <template v-slot:[`item.info`]="{ item }">
        <span class="d-block"> النوع: {{ item.gender.text }} </span>
        <span class="d-block"> العمر: {{ item.age }} </span>
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
  name: "Patients",

  data: () => ({
    // loading data
    loadingData: false,

    // dialog
    dialog: false,
    dialogDelete: false,

    headers: [
      { text: "المريض", value: "name" },
      { text: "البريد الالكترونى", value: "email" },
      { text: "رقم الهاتف", value: "phone_number" },
      { text: "النوع و العمر", value: "info", sortable: false },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    // items
    desserts: [],

    // page number
    pageNumber: 1,

    // last page
    lastPage: 1,

    // genders
    genders: [
      { text: "ذكر", value: "m" },
      { text: "انثى", value: "f" },
    ],

    // search
    search: "",
    searchTimeout: null,

    // edited item
    editedIndex: -1,

    // edited item
    editedItem: {
      id: "",
      name: "",
      email: "",
      phone_number: "",
      national_id: "",
      gender: "",
      birthday: "",
    },

    // date picker
    menu: false,

    // max date
    maxDate: new Date().toISOString().substr(0, 10),

    // active picker
    activePicker: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "مريض جديد" : "تعديل المريض";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      selectRules: "validationRules/selectRules",
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

    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  created() {
    // init data
    this.initData();
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

      // get patients
      this.axios
        .get(`dashboard/patients?page=${this.pageNumber}`, {
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
    },

    // search data
    searchData() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        // show loading
        this.loadingData = true;

        this.axios
          .get(`dashboard/patients?search=${this.search}`, {
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

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // show request loading
      this.showRequsetLoading();

      // get single item data from show api
      this.axios
        .get(`dashboard/patients/${item.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.editedItem = Object.assign(
            {},
            {
              id: response.data.data.id,
              name: response.data.data.name,
              email: response.data.data.email,
              phone_number: response.data.data.phone_number,
              national_id: response.data.data.national_id,
              gender: response.data.data.gender.value,
              birthday: response.data.data.birthday,
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
      // show request loading
      this.showRequsetLoading();

      this.axios
        .delete(`dashboard/patients/${this.editedItem.id}`, {
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

    async save() {
      if (this.editedIndex > -1) {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("name", this.editedItem.name);
          data.append("email", this.editedItem.email);
          data.append("phone_number", this.editedItem.phone_number);
          data.append("birthday", this.editedItem.birthday);
          data.append("gender", this.editedItem.gender);
          data.append("national_id", this.editedItem.national_id);
          data.append("_method", "PUT");

          // show request loading
          this.showRequsetLoading();

          await this.axios
            .post(`dashboard/patients/${this.editedItem.id}`, data, {
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
          data.append("name", this.editedItem.name);
          data.append("email", this.editedItem.email);
          data.append("phone_number", this.editedItem.phone_number);
          data.append("birthday", this.editedItem.birthday);
          data.append("gender", this.editedItem.gender);
          data.append("national_id", this.editedItem.national_id);

          // show request loading
          this.showRequsetLoading();

          await this.axios
            .post(`dashboard/patients`, data, {
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
