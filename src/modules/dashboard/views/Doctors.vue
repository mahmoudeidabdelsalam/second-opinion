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
            الاطباء
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
                          v-model="editedItem.full_name_en"
                          :rules="nameRules"
                          label="الاسم باللغة الانجليزية"
                          outlined
                          dense
                          dir="ltr"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.full_name_ar"
                          :rules="nameRules"
                          label="الاسم باللغة العربية"
                          outlined
                          dense
                          dir="rtl"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.title_en"
                          :rules="nameRules"
                          label="اللقب باللغة الانجليزية"
                          outlined
                          dense
                          dir="ltr"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.title_ar"
                          :rules="nameRules"
                          label="اللقب باللغة العربية"
                          outlined
                          dense
                          dir="rtl"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
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
                          v-model="editedItem.session_price"
                          :rules="numberRules"
                          type="number"
                          label="سعر الكشف"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.consultation_price"
                          :rules="numberRules"
                          type="number"
                          label="سعر الاستشارة"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          v-model="editedItem.session_duration"
                          :items="[15, 30, 45, 60]"
                          :rules="selectRules"
                          label="مدة الكشف (بالدقائق)"
                          outlined
                          dense
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-select
                          v-model="editedItem.department_id"
                          :items="departments"
                          :rules="selectRules"
                          label="القسم"
                          outlined
                          dense
                        ></v-select>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-textarea
                          v-model="editedItem.educations_en"
                          :rules="descriptionRules"
                          label="الشهادات باللغة الانجليزية"
                          outlined
                          dense
                          auto-grow
                          rows="2"
                          dir="ltr"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-textarea
                          v-model="editedItem.educations_ar"
                          :rules="descriptionRules"
                          label="الشهادات باللغة العربية"
                          outlined
                          dense
                          auto-grow
                          rows="2"
                          dir="rtl"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-textarea
                          v-model="editedItem.experiences_en"
                          :rules="descriptionRules"
                          label="الخبرات باللغة الانجليزية"
                          outlined
                          dense
                          auto-grow
                          rows="2"
                          dir="ltr"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-textarea
                          v-model="editedItem.experiences_ar"
                          :rules="descriptionRules"
                          label="الخبرات باللغة العربية"
                          outlined
                          dense
                          auto-grow
                          rows="2"
                          dir="rtl"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.job_id"
                          :rules="jobIdRules"
                          type="number"
                          label="الرقم الوظيفي"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-checkbox
                          v-model="editedItem.featured"
                          label="طبيب مميز"
                          class="mt-1"
                        ></v-checkbox>
                      </v-col>

                      <v-col cols="12" md="6">
                        <file-pond
                          ref="pond"
                          label-idle="ارفق صورة الطبيب"
                          accepted-file-types="image/jpeg, image/png, image/jpg, image/gif, image/webp"
                          @addfile="onAddDoctorImage"
                        />
                      </v-col>

                      <v-col cols="12" md="6">
                        <file-pond
                          ref="pond"
                          label-idle="png ارفق صورة امضاء الطبيب بصيغة"
                          accepted-file-types="image/png"
                          @addfile="onAddDoctorSignature"
                        />
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
                  <v-list-item-title>الاطباء</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item link @click.prevent="initData('trashed')">
                <v-list-item-content>
                  <v-list-item-title> الاطباء المحذوفين </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- delete item -->
          <v-dialog persistent v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متاكد من حذف هذا الطبيب؟
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
                هل انت متاكد من استعادة هذا الطبيب؟
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

      <template v-slot:[`item.full_name`]="{ item }">
        <div class="d-flex justify-start align-center rounded-pill clickable-row-item" @click="goToDoctorProfile(item.id)"
        >
          <v-avatar size="50">
            <v-img
              cover
              :lazy-src="item.profile"
              max-height="50"
              max-width="50"
              :src="item.profile"
              :alt="item.name"
            ></v-img>
          </v-avatar>
          <span class="d-block black--text font-weight-medium mx-4">
            {{ item.full_name }}
          </span>
        </div>
      </template>

      <template v-slot:[`item.department.name`]="{ item }">
        <div class="d-flex justify-start align-center">
          <v-avatar size="50" v-if="item.department">
            <v-img
              cover
              :lazy-src="item.department.logo"
              max-height="50"
              max-width="50"
              :src="item.department.logo"
              :alt="item.department.name"
            ></v-img>
          </v-avatar>
          <span class="d-block font-weight-medium mx-4" v-if="item.department">
            {{ item.department.name }}
          </span>
        </div>
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

      <template v-slot:[`item.session_price`]="{ item }">
        <span class="d-block">
          {{ item.session_price + " ريال" }}
        </span>
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

// Import Vue FilePond
import vueFilePond from "vue-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import FilePond plugins
// Please note that you need to install these plugins separately
// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  name: "Doctors",

  components: {
    FilePond,
  },

  data: () => ({
    // loading data
    loadingData: false,

    // dialog
    dialog: false,
    dialogDelete: false,
    dialogRestore: false,

    headers: [
      { text: "الطبيب", value: "full_name" },
      { text: "القسم", value: "department.name" },
      { text: "البريد الالكترونى", value: "email" },
      { text: "رقم الهاتف", value: "phone_number" },
      { text: "سعر الحجز", value: "session_price" },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    // items
    desserts: [],

    // page number
    pageNumber: 1,

    // last page
    lastPage: 1,

    // departments
    departments: [],

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
      full_name_en: "",
      full_name_ar: "",
      title_en: "",
      title_ar: "",
      email: "",
      phone_number: "",
      gender: "",
      session_price: "",
      session_duration: "",
      consultation_price: "",
      department_id: "",
      image: "",
      signature: "",
      job_id: "",
      featured: false,
      educations_en: "",
      educations_ar: "",
      experiences_en: "",
      experiences_ar: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "طبيب جديد" : "تعديل الطبيب";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      descriptionRules: "validationRules/descriptionRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      numberRules: "validationRules/numberRules",
      selectRules: "validationRules/selectRules",
      durationRules: "validationRules/durationRules",
      jobIdRules: "validationRules/jobIdRules",
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
          .get(`dashboard/doctors?removed=only`, {
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

        // update query params
        this.$router
          .push({
            name: "Doctors",
            query: { trashed: dataType },
          })
          .catch(() => {});
      } else {
        this.axios
          .get(`dashboard/doctors?page=${this.pageNumber}`, {
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

        // update query params
        this.$router
          .push({
            name: "Doctors",
            query: {},
          })
          .catch(() => {});
      }

      // get departments
      this.axios
        .get(`dashboard/departments`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          // set data
          this.departments = response.data.data.map((item) => {
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

    // handle image
    onAddDoctorImage(_, file) {
      this.editedItem.image = file.file;
    },

    // handle signature
    onAddDoctorSignature(_, file) {
      this.editedItem.signature = file.file;
    },

    // search data
    searchData() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        // show loading
        this.loadingData = true;

        this.axios
          .get(`dashboard/doctors?search=${this.search}`, {
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
        .get(`dashboard/doctors/${item.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.editedItem = Object.assign(
            {},
            {
              id: response.data.data.id,
              full_name_en: response.data.data.en.full_name,
              full_name_ar: response.data.data.ar.full_name,
              title_en: response.data.data.en.title,
              title_ar: response.data.data.ar.title,
              email: response.data.data.email,
              phone_number: response.data.data.phone_number,
              gender: response.data.data.gender,
              session_price: response.data.data.session_price,
              consultation_price: response.data.data.consultation_price,
              session_duration: response.data.data.session_duration,
              department_id: response.data.data.department.id,
              educations_en: response.data.data.en.educations,
              educations_ar: response.data.data.ar.educations,
              experiences_en: response.data.data.en.experiences,
              experiences_ar: response.data.data.ar.experiences,
              job_id: response.data.data.job_id,
              featured: response.data.data.featured,
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
        .delete(`dashboard/doctors/${this.editedItem.id}`, {
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
          `dashboard/doctors/${this.editedItem.id}/restore`,
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
        let data = new FormData();
        data.append("full_name:en", this.editedItem.full_name_en);
        data.append("full_name:ar", this.editedItem.full_name_ar);
        if (this.editedItem.image) {
          data.append("image", this.editedItem.image);
        }
        data.append("gender", this.editedItem.gender);
        data.append("email", this.editedItem.email);
        data.append("phone_number", this.editedItem.phone_number);
        data.append("title:en", this.editedItem.title_en);
        data.append("title:ar", this.editedItem.title_ar);
        data.append("department_id", this.editedItem.department_id);
        data.append("session_price", this.editedItem.session_price);
        data.append("session_duration", this.editedItem.session_duration);
        data.append("consultation_price", this.editedItem.consultation_price);
        if (this.editedItem.signature) {
          data.append("signature", this.editedItem.signature);
        }
        data.append("job_id", this.editedItem.job_id);
        if (this.editedItem.featured) {
          data.append("featured", 1);
        } else {
          data.append("featured", 0);
        }
        data.append("educations:en", this.editedItem.educations_en);
        data.append("educations:ar", this.editedItem.educations_ar);
        data.append("experiences:en", this.editedItem.experiences_en);
        data.append("experiences:ar", this.editedItem.experiences_ar);
        data.append("_method", "PUT");

        // hide request loading
        this.hideRequsetLoading();

        await this.axios
          .post(`dashboard/doctors/${this.editedItem.id}`, data, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            Object.assign(this.desserts[this.editedIndex], response.data.data);
            this.handleResponse(response);
            this.close();
            this.$refs.pond.removeFiles();

            // hide request loading
            this.hideRequsetLoading();
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide request loading
            this.hideRequsetLoading();
          });
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("full_name:en", this.editedItem.full_name_en);
          data.append("full_name:ar", this.editedItem.full_name_ar);
          data.append("image", this.editedItem.image);
          data.append("gender", this.editedItem.gender);
          data.append("email", this.editedItem.email);
          data.append("phone_number", this.editedItem.phone_number);
          data.append("title:en", this.editedItem.title_en);
          data.append("title:ar", this.editedItem.title_ar);
          data.append("department_id", this.editedItem.department_id);
          data.append("session_price", this.editedItem.session_price);
          data.append("session_duration", this.editedItem.session_duration);
          data.append("consultation_price", this.editedItem.consultation_price);
          data.append("signature", this.editedItem.signature);
          data.append("job_id", this.editedItem.job_id);
          if (this.editedItem.featured) {
            data.append("featured", 1);
          } else {
            data.append("featured", 0);
          }
          data.append("educations:en", this.editedItem.educations_en);
          data.append("educations:ar", this.editedItem.educations_ar);
          data.append("experiences:en", this.editedItem.experiences_en);
          data.append("experiences:ar", this.editedItem.experiences_ar);

          // show request loading
          this.showRequsetLoading();

          await this.axios
            .post(`dashboard/doctors`, data, {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            })
            .then((response) => {
              this.desserts.unshift(response.data.data);
              this.handleResponse(response);
              this.close();
              this.$refs.pond.removeFiles();

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

    // go to doctor profile
    goToDoctorProfile(doctorId) {
      this.$router.push({
        name: "DoctorProfile",
        params: { id: doctorId },
      });
    },
  },
};
</script>
