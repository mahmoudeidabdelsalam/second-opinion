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
            الاقسام
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog persistent scrollable v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <!-- new item btn -->
              <v-btn color="primary" depressed v-bind="attrs" v-on="on">
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

                      <v-col cols="12" md="6">
                        <v-textarea
                          v-model="editedItem.description_en"
                          :rules="descriptionRules"
                          label="الوصف باللغة الانجليزية"
                          outlined
                          dense
                          auto-grow
                          rows="2"
                          dir="ltr"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-textarea
                          v-model="editedItem.description_ar"
                          :rules="descriptionRules"
                          label="الوصف باللغة العربية"
                          outlined
                          dense
                          auto-grow
                          rows="2"
                          dir="rtl"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12" md="6">
                        <file-pond
                          ref="pond"
                          label-idle="ارفق صورة القسم"
                          accepted-file-types="image/jpeg, image/png, image/jpg, image/gif, image/webp"
                          @addfile="onAddFile"
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

         

          <!-- delete item -->
          <v-dialog persistent v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متأكد من حذف هذا القسم؟
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

                    <!-- delete item -->
          <v-dialog persistent v-model="dialogDeleteForce" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متأكد من حذف هذا القسم؟
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" depressed @click="closeDeleteForce">
                  الغاء
                </v-btn>
                <v-btn color="error" depressed @click="deleteItemConfirmForce">
                  حذف
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


          <!-- restore item -->
          <v-dialog persistent v-model="dialogRestore" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                هل انت متأكد من استعادة هذا القسم؟
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

      <template v-slot:[`item.name`]="{ item }">
        <div class="d-flex justify-start align-center">
          <v-avatar size="50">
            <v-img
              cover
              :lazy-src="item.logo"
              max-height="50"
              max-width="50"
              :src="item.logo"
              :alt="item.name"
            ></v-img>
          </v-avatar>
          <span class="d-block font-weight-medium mx-4">
            {{ item.name }}
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

        <v-btn
          class="primary--text primary_bg mx-2"
          icon
          @click="deleteItemForce(item)"
          v-if="isTrashed"
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
  name: "Departments",

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
      { text: "القسم", value: "name" },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    // items
    desserts: [],

    // page number
    pageNumber: 1,

    // last page
    lastPage: 1,

    // search
    search: "",
    searchTimeout: null,

    // edited item
    editedIndex: -1,

    // edited item
    editedItem: {
      id: "",
      name_en: "",
      name_ar: "",
      description_en: "",
      description_ar: "",
      image: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "قسم جديد" : "تعديل القسم";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      descriptionRules: "validationRules/descriptionRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
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

    dialogDeleteForce(val) {
      val || this.closeDeleteForce();
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
      // show loading
      this.loadingData = true;

      // check data type
      if (dataType === "trashed") {
        this.axios
          .get(`dashboard/departments?removed=only`, {
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
            name: "Departments",
            query: { trashed: dataType },
          })
          .catch(() => {});
      } else {
        this.axios
          .get(`dashboard/departments?page=${this.pageNumber}`, {
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
            name: "Departments",
            query: {},
          })
          .catch(() => {});
      }
    },

    // search data
    searchData() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        // show loading
        this.loadingData = true;

        this.axios
          .get(`dashboard/departments?search=${this.search}`, {
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

    // handle image
    onAddFile(_, file) {
      this.editedItem.image = file.file;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // show request loading
      this.showRequsetLoading();

      this.axios
        .get(`dashboard/departments/${item.id}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.editedItem = Object.assign(
            {},
            {
              id: response.data.data.id,
              name_en: response.data.data.en.name,
              name_ar: response.data.data.ar.name,
              description_en: response.data.data.en.description,
              description_ar: response.data.data.ar.description,
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

    deleteItemForce(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDeleteForce = true;
    },

    deleteItemConfirm() {
      // show request loading
      this.showRequsetLoading();

      this.axios
        .delete(`dashboard/departments/${this.editedItem.id}`, {
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

    deleteItemConfirmForce() {
      // show request loading
      this.showRequsetLoading();

      this.axios
        .delete(`dashboard/departments/${this.editedItem.id}/force`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.desserts.splice(this.editedIndex, 1);
          this.handleResponse(response);
          this.closeDeleteForce();

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
          `dashboard/departments/${this.editedItem.id}/restore`,
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

    closeDeleteForce() {
      this.dialogDeleteForce = false;
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
          data.append("name:en", this.editedItem.name_en);
          data.append("name:ar", this.editedItem.name_ar);
          data.append("description:en", this.editedItem.description_en);
          data.append("description:ar", this.editedItem.description_ar);
          this.editedItem.image
            ? data.append("image", this.editedItem.image)
            : "";
          data.append("_method", "PUT");

          // show request loading
          this.showRequsetLoading();

          await this.axios
            .post(`dashboard/departments/${this.editedItem.id}`, data, {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            })
            .then((response) => {
              Object.assign(
                this.desserts[this.editedIndex],
                response.data.data
              );
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
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("name:en", this.editedItem.name_en);
          data.append("name:ar", this.editedItem.name_ar);
          data.append("description:en", this.editedItem.description_en);
          data.append("description:ar", this.editedItem.description_ar);
          data.append("image", this.editedItem.image);

          // show request loading
          this.showRequsetLoading();

          await this.axios
            .post(`dashboard/departments`, data, {
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
  },
};
</script>
