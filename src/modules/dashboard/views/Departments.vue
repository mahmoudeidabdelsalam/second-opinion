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
              الاقسام
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <!-- new item btn -->
                <v-btn color="primary" dark depressed v-bind="attrs" v-on="on">
                  <v-icon left>mdi-plus</v-icon>
                  جديد
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" :v-model="valid" lazy-validation>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.en_name"
                            :rules="nameRules"
                            label="الاسم باللغة الانجليزية"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.ar_name"
                            :rules="nameRules"
                            label="الاسم باللغة العربية"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-textarea
                            v-model="editedItem.en_description"
                            :rules="descriptionRules"
                            label="الوصف باللغة الانجليزية"
                            outlined
                            dense
                            auto-grow
                            rows="2"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-textarea
                            v-model="editedItem.ar_description"
                            :rules="descriptionRules"
                            label="الوصف باللغة العربية"
                            outlined
                            dense
                            auto-grow
                            rows="2"
                          ></v-textarea>
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
                            v-model="editedItem.telephone"
                            :rules="phoneRules"
                            type="tel"
                            label="رقم الهاتف"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <file-pond
                            ref="pond"
                            label-idle="اسحب وأفلت الملفات هنا أو <span class='filepond--label-action'> اختر الملفات </span>"
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
                  <v-btn color="secondary" depressed small @click="close">
                    الغاء
                  </v-btn>
                  <v-btn color="primary" depressed small @click="save">
                    حفظ
                  </v-btn>
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
                    <v-list-item-title>الاقسام فقط</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click.prevent="initData('trashed')">
                  <v-list-item-content>
                    <v-list-item-title>الاقسام المحذوفة</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- delete item -->
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h6">
                  هل انت متأكد من حذف هذا القسم؟
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary" depressed small @click="closeDelete">
                    الغاء
                  </v-btn>
                  <v-btn
                    color="error"
                    depressed
                    small
                    @click="deleteItemConfirm"
                  >
                    حذف
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- restore item -->
            <v-dialog v-model="dialogRestore" max-width="600px">
              <v-card>
                <v-card-title class="text-h6">
                  هل انت متأكد من استعادة هذا القسم؟
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="secondary"
                    depressed
                    small
                    @click="closeRestore"
                  >
                    الغاء
                  </v-btn>
                  <v-btn
                    color="error"
                    depressed
                    small
                    @click="restoreItemConfirm"
                  >
                    استعادة
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
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
            <span class="d-block black--text font-weight-bold mx-4">
              {{ item.name }}
            </span>
          </div>
        </template>

        <!-- <template v-slot:[`item.services`]="{}">
          <v-btn class="primary--text" icon link :to="{ name: 'Departments' }">
            <v-icon small>mdi-launch</v-icon>
          </v-btn>
        </template> -->

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
  </transition>
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
    loaded: false,
    dialog: false,
    dialogDelete: false,
    dialogRestore: false,
    headers: [
      { text: "الاقسام", value: "name" },
      { text: "البريد الالكترونى", value: "email" },
      { text: "رقم الهاتف", value: "telephone" },
      // { text: "Services", value: "services", sortable: false },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],
    desserts: [],
    // selected rows
    singleSelect: false,
    selected: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      en_name: "",
      ar_name: "",
      en_description: "",
      ar_description: "",
      email: "",
      telephone: "",
      image: "",
    },
    defaultItem: {
      id: "",
      en_name: "",
      ar_name: "",
      en_description: "",
      ar_description: "",
      email: "",
      telephone: "",
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
  },

  created() {
    // init data
    this.initData(this.$route.query.trashed || "normal");
  },

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
      addData: "crudOperations/addData",
      updateData: "crudOperations/updateData",
      deleteData: "crudOperations/deleteData",
      restoreData: "crudOperations/restoreData",
    }),

    // init data
    initData(dataType) {
      setTimeout(() => {
        // check data type
        if (dataType === "trashed") {
          this.getData("dashboard/departments?removed=only").then((res) => {
            this.desserts = res;
          });

          // update query params
          this.$router
            .push({
              name: "Departments",
              query: { trashed: dataType },
            })
            .catch(() => {});
        } else {
          this.getData("dashboard/departments").then((res) => {
            this.desserts = res;
          });

          // update query params
          this.$router
            .push({
              name: "Departments",
              query: {},
            })
            .catch(() => {});
        }

        this.loaded = true;
      }, 0);
    },

    // handle image
    onAddFile(error, file) {
      console.log("file added", { error, file });
      this.editedItem.image = file.file;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.getData(`dashboard/departments/${item.id}`).then((res) => {
        this.editedItem = Object.assign(
          {},
          {
            id: res.id,
            en_name: res.en.name,
            ar_name: res.ar.name,
            en_description: res.en.description,
            ar_description: res.ar.description,
            email: res.email,
            telephone: res.telephone,
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
        url: "dashboard/departments",
        id: this.editedItem.id,
      }).then(() => {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
      });
    },

    restoreItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogRestore = true;
    },

    restoreItemConfirm() {
      this.restoreData({
        url: "dashboard/departments",
        id: this.editedItem.id,
      }).then(() => {
        this.desserts.splice(this.editedIndex, 1);
        this.closeRestore();
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
        data.append("name:en", this.editedItem.en_name);
        data.append("name:ar", this.editedItem.ar_name);
        data.append("description:en", this.editedItem.en_description);
        data.append("description:ar", this.editedItem.ar_description);
        data.append("email", this.editedItem.email);
        data.append("telephone", this.editedItem.telephone);
        this.editedItem.image
          ? data.append("image", this.editedItem.image)
          : "";
        data.append("_method", "PUT");

        await this.updateData({
          url: `dashboard/departments/${this.editedItem.id}`,
          data: data,
        }).then((res) => {
          Object.assign(this.desserts[this.editedIndex], res);
          this.close();
        });
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("name:en", this.editedItem.en_name);
          data.append("name:ar", this.editedItem.ar_name);
          data.append("description:en", this.editedItem.en_description);
          data.append("description:ar", this.editedItem.ar_description);
          data.append("email", this.editedItem.email);
          data.append("telephone", this.editedItem.telephone);
          data.append("image", this.editedItem.image);

          this.addData({
            url: "dashboard/departments",
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
