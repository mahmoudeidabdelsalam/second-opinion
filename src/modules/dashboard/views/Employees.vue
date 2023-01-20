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
              الموظفين
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
                            v-model="editedItem.full_name"
                            :rules="nameRules"
                            label="الاسم"
                            outlined
                            dense
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

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.national_id"
                            :rules="nationalIdRules"
                            type="number"
                            label="الرقم القومي"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.active"
                            :items="status"
                            :rules="selectRules"
                            label="الحالة"
                            outlined
                            dense
                          ></v-select>
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
                    <v-list-item-title>الموظفين</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click.prevent="initData('trashed')">
                  <v-list-item-content>
                    <v-list-item-title> الموظفين المحذوفين </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- delete item -->
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h6">
                  هل انت متاكد من حذف هذا الموظف؟
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
                  هل انت متاكد من استعادة هذا الموظف؟
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
          <span class="d-block black--text font-weight-bold">
            {{ item.full_name }}
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
    </section>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Employees",

  data: () => ({
    // loading
    loaded: false,

    // dialog
    dialog: false,
    dialogDelete: false,
    dialogRestore: false,

    headers: [
      { text: "الموظف", value: "name" },
      { text: "البريد الالكترونى", value: "email" },
      { text: "رقم الهاتف", value: "phone_number" },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    desserts: [],

    // genders
    genders: [
      { text: "ذكر", value: "m" },
      { text: "انثى", value: "f" },
    ],

    // sttaus
    status: [
      { text: "نشط", value: "1" },
      { text: "خامل", value: "0" },
    ],

    // selected rows
    singleSelect: false,
    selected: [],

    editedIndex: -1,

    editedItem: {
      id: "",
      full_name: "",
      email: "",
      phone_number: "",
      active: "",
      national_id: "",
      gender: "",
      image: "",
    },

    // date picker
    menu: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "موظف جديد" : "تعديل الموظف";
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
          this.getData("dashboard/employees?removed=only").then((res) => {
            this.desserts = res;
          });

          // update query params
          this.$router
            .push({
              name: "Employees",
              query: { trashed: dataType },
            })
            .catch(() => {});
        } else {
          this.getData("dashboard/employees").then((res) => {
            this.desserts = res;
          });

          // update query params
          this.$router
            .push({
              name: "Employees",
              query: {},
            })
            .catch(() => {});
        }

        this.loaded = true;
      }, 0);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.getData(`dashboard/employees/${item.id}`).then((res) => {
        this.editedItem = Object.assign(
          {},
          {
            id: res.id,
            full_name: res.en.full_name,
            full_name_ar: res.ar.full_name,
            email: res.email,
            personal_phone: res.personal_phone,
            phone_number: res.phone_number,
            birthday: res.birthday,
            active: res.active ? "1" : "0",
            national_id: res.national_id,
            gender: res.gender,
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
        url: "dashboard/employees",
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
        url: "dashboard/employees",
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
        data.append("full_name:en", this.editedItem.full_name);
        data.append("full_name:ar", this.editedItem.full_name_ar);
        data.append("email", this.editedItem.email);
        data.append("personal_phone", this.editedItem.personal_phone);
        data.append("phone_number", this.editedItem.phone_number);
        data.append("active", this.editedItem.active);
        data.append("national_id", this.editedItem.national_id);
        data.append("birthday", this.editedItem.birthday);
        data.append("gender", this.editedItem.gender);
        this.editedItem.image
          ? data.append("profile", this.editedItem.image)
          : "";
        data.append("_method", "PUT");

        await this.updateData({
          url: `dashboard/employees/${this.editedItem.id}`,
          data: data,
        }).then((res) => {
          Object.assign(this.desserts[this.editedIndex], res);
          this.close();
        });
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("full_name:en", this.editedItem.full_name);
          data.append("full_name:ar", this.editedItem.full_name_ar);
          data.append("email", this.editedItem.email);
          data.append("personal_phone", this.editedItem.personal_phone);
          data.append("phone_number", this.editedItem.phone_number);
          data.append("active", this.editedItem.active);
          data.append("national_id", this.editedItem.national_id);
          data.append("birthday", this.editedItem.birthday);
          data.append("gender", this.editedItem.gender);
          this.editedItem.image
            ? data.append("profile", this.editedItem.image)
            : "";

          this.addData({
            url: "dashboard/employees",
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
