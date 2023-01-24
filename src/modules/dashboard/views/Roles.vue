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
        :loading="loadingData"
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
            <v-dialog persistent v-model="dialog" max-width="800px" scrollable>
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
            <v-dialog persistent v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h6">
                  هل انت متاكد من حذف هذة الصلاحية ؟
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
  name: "Roles",

  data: () => ({
    // loading
    loaded: false,

    // loading data
    loadingData: false,

    // dialog
    dialog: false,
    dialogDelete: false,

    headers: [
      { text: "الصلاحيات", value: "name" },
      { text: "الاجراءات", value: "actions", sortable: false },
    ],

    desserts: [],

    // permissions
    permissions: [],

    // selected rows
    singleSelect: false,
    selected: [],

    editedIndex: -1,

    editedItem: {
      id: "",
      en_name: "",
      ar_name: "",
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
      this.loadingData = true;
      setTimeout(() => {
        // get roles
        this.getData("dashboard/roles").then((res) => {
          this.desserts = res;
        });

        this.loaded = true;

        // get permissions
        this.getData("dashboard/permissions").then((res) => {
          this.loadingData = false;
          this.permissions = res;
        });
      }, 0);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.getData(`dashboard/roles/${item.id}`).then((res) => {
        this.editedItem = Object.assign(
          {},
          {
            id: res.id,
            en_name: res.en.display_name,
            ar_name: res.ar.display_name,
            permissions: res.permissions.map((item) => item.id),
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
        url: "dashboard/roles",
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
        data.append("name:en", this.editedItem.en_name);
        data.append("name:ar", this.editedItem.ar_name);
        for (let i = 0; i < this.editedItem.permissions.length; i++) {
          data.append("permissions[]", this.editedItem.permissions[i]);
        }
        data.append("_method", "PUT");

        await this.updateData({
          url: `dashboard/roles/${this.editedItem.id}`,
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
          for (let i = 0; i < this.editedItem.permissions.length; i++) {
            data.append("permissions[]", this.editedItem.permissions[i]);
          }

          this.addData({
            url: "dashboard/roles",
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
