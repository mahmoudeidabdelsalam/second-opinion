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
              المرضى
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px" scrollable>
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
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.name"
                            :rules="nameRules"
                            label="الاسم بالكامل"
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

                        <v-col cols="12">
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
                  <v-btn color="secondary" depressed small @click="close">
                    الغاء
                  </v-btn>
                  <v-btn color="primary" depressed small @click="save">
                    حفظ
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- delete item -->
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h6">
                  هل انت متاكد من حذف المريض؟
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
          </v-toolbar>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <span class="d-block black--text font-weight-bold">
            {{ item.name }}
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
            النوع: {{ item.gender.text }}
          </span>
          <span class="d-block black--text"> العمر: {{ item.age }} </span>
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
  name: "Patients",

  data: () => ({
    // loading
    loaded: false,

    // dialog
    dialog: false,
    dialogDelete: false,

    headers: [
      { text: "المريض", value: "name" },
      { text: "التواصل", value: "contacts", sortable: false },
      { text: "النوع و العمر", value: "info", sortable: false },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    desserts: [],

    // genders
    genders: [
      { text: "ذكر", value: "m" },
      { text: "انثى", value: "f" },
    ],

    // selected rows
    singleSelect: false,
    selected: [],

    editedIndex: -1,

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
            name: res.name,
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
        data.append("name", this.editedItem.name);
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
          data.append("name", this.editedItem.name);
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

<style lang="scss"></style>
