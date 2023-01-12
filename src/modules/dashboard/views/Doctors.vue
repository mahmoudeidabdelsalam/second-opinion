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
        no-data-text="No doctors."
        @dblclick:row="goToDoctorProfile"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="black--text font-weight-medium">
              Doctors
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <!-- new item btn -->
                <v-btn color="primary" dark depressed v-bind="attrs" v-on="on">
                  <v-icon left>mdi-plus</v-icon>
                  New
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
                            v-model="editedItem.full_name_en"
                            :rules="nameRules"
                            label="English name"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.full_name_ar"
                            :rules="nameRules"
                            label="Arabic name"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.title_en"
                            :rules="nameRules"
                            label="English title"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.title_ar"
                            :rules="nameRules"
                            label="Arabic title"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-textarea
                            v-model="editedItem.description_en"
                            :rules="descriptionRules"
                            label="English description"
                            outlined
                            dense
                            auto-grow
                            rows="2"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-textarea
                            v-model="editedItem.description_ar"
                            :rules="descriptionRules"
                            label="Arabic description"
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
                            label="Email"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.phone_number"
                            :rules="phoneRules"
                            type="tel"
                            label="Phone"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.gender"
                            :items="genders"
                            :rules="selectRules"
                            label="Gender"
                            outlined
                            dense
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.session_price"
                            :rules="numberRules"
                            type="number"
                            label="Session price"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.session_duration"
                            :rules="numberRules"
                            type="number"
                            label="Session duration (in minutes)"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.department_id"
                            :items="departments"
                            :rules="selectRules"
                            label="Department"
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
                    Cancel
                  </v-btn>
                  <v-btn color="primary" depressed small @click="save">
                    Save
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
                  Filter
                </v-btn>
              </template>
              <v-list>
                <v-list-item link @click.prevent="initData('normal')">
                  <v-list-item-content>
                    <v-list-item-title>Doctors only</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link @click.prevent="initData('trashed')">
                  <v-list-item-content>
                    <v-list-item-title>Trashed only</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- delete item -->
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h6">
                  Are you sure you want to delete this doctor?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary" depressed small @click="closeDelete">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="error"
                    depressed
                    small
                    @click="deleteItemConfirm"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- restore item -->
            <v-dialog v-model="dialogRestore" max-width="600px">
              <v-card>
                <v-card-title class="text-h6">
                  Are you sure you want to restore this doctor?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="secondary"
                    depressed
                    small
                    @click="closeRestore"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="error"
                    depressed
                    small
                    @click="restoreItemConfirm"
                  >
                    Restore
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <div class="d-flex justify-start align-center">
            <v-avatar class="mr-4" size="50">
              <v-img
                cover
                :lazy-src="item.profile"
                max-height="50"
                max-width="50"
                :src="item.profile"
                :alt="item.name"
              ></v-img>
            </v-avatar>
            <span class="d-block black--text font-weight-bold">
              {{ item.full_name }}
            </span>
          </div>
        </template>

        <template v-slot:[`item.department`]="{ item }">
          <div class="d-flex justify-start align-center">
            <v-avatar class="mr-4" size="50" v-if="item.department">
              <v-img
                cover
                :lazy-src="item.department.logo"
                max-height="50"
                max-width="50"
                :src="item.department.logo"
                :alt="item.department.name"
              ></v-img>
            </v-avatar>
            <span
              class="d-block black--text font-weight-bold"
              v-if="item.department"
            >
              {{ item.department.name }}
            </span>
          </div>
        </template>

        <template v-slot:[`item.contacts`]="{ item }">
          <span class="d-block black--text">
            {{ item.email }}
          </span>
          <span class="d-block black--text">
            {{ item.phone_number }}
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
  name: "Doctors",

  data: () => ({
    loaded: false,
    dialog: false,
    dialogDelete: false,
    dialogRestore: false,
    headers: [
      { text: "Doctor", value: "name", sortable: false },
      { text: "Department", value: "department", sortable: false },
      { text: "Contacts", value: "contacts", sortable: false },
      { text: "Session price", value: "session_price", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    // departments
    departments: [],
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
      full_name_en: "",
      full_name_ar: "",
      description_en: "",
      description_ar: "",
      title_en: "",
      title_ar: "",
      email: "",
      phone_number: "",
      gender: "",
      session_price: "",
      session_duration: "",
      department_id: "",
      image: "",
    },
    defaultItem: {
      id: "",
      full_name_en: "",
      full_name_ar: "",
      description_en: "",
      description_ar: "",
      title_en: "",
      title_ar: "",
      email: "",
      phone_number: "",
      gender: "",
      session_price: "",
      session_duration: "",
      department_id: "",
      image: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Doctor" : "Edit Doctor";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      descriptionRules: "validationRules/descriptionRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      numberRules: "validationRules/numberRules",
      selectRules: "validationRules/selectRules",
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
          this.getData("dashboard/doctors?removed=only").then((res) => {
            this.desserts = res;
          });

          // update query params
          this.$router
            .push({
              name: "Doctors",
              query: { trashed: dataType },
            })
            .catch(() => {});
        } else {
          this.getData("dashboard/doctors").then((res) => {
            this.desserts = res;
          });

          // update query params
          this.$router
            .push({
              name: "Doctors",
              query: {},
            })
            .catch(() => {});
        }

        this.loaded = true;

        // get departments
        this.getData("dashboard/departments").then((res) => {
          this.departments = res.map((item) => {
            return {
              text: item.name,
              value: item.id,
            };
          });
        });
      }, 0);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.getData(`dashboard/doctors/${item.id}`).then((res) => {
        this.editedItem = Object.assign(
          {},
          {
            id: res.id,
            full_name_en: res.en.full_name,
            full_name_ar: res.ar.full_name,
            title_en: res.en.title,
            title_ar: res.ar.title,
            email: res.email,
            phone_number: res.phone_number,
            gender: res.gender,
            session_price: res.session_price,
            session_duration: res.session_duration,
            department_id: res.department.id,
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
        url: "dashboard/doctors",
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
        url: "dashboard/doctors",
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
        data.append("full_name:en", this.editedItem.full_name_en);
        data.append("full_name:ar", this.editedItem.full_name_ar);
        data.append("description:en", this.editedItem.description_en);
        data.append("description:ar", this.editedItem.description_ar);
        data.append("title:en", this.editedItem.title_en);
        data.append("title:ar", this.editedItem.title_ar);
        data.append("email", this.editedItem.email);
        data.append("phone_number", this.editedItem.phone_number);
        data.append("gender", this.editedItem.gender);
        data.append("session_price", this.editedItem.session_price);
        data.append("session_duration", this.editedItem.session_duration);
        data.append("department_id", this.editedItem.department_id);
        this.editedItem.image
          ? data.append("image", this.editedItem.image)
          : "";
        data.append("_method", "PUT");

        await this.updateData({
          url: `dashboard/doctors/${this.editedItem.id}`,
          data: data,
        }).then((res) => {
          Object.assign(this.desserts[this.editedIndex], res);
          this.close();
        });
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("full_name:en", this.editedItem.full_name_en);
          data.append("full_name:ar", this.editedItem.full_name_ar);
          data.append("description:en", this.editedItem.description_en);
          data.append("description:ar", this.editedItem.description_ar);
          data.append("title:en", this.editedItem.title_en);
          data.append("title:ar", this.editedItem.title_ar);
          data.append("email", this.editedItem.email);
          data.append("phone_number", this.editedItem.phone_number);
          data.append("gender", this.editedItem.gender);
          data.append("session_price", this.editedItem.session_price);
          data.append("session_duration", this.editedItem.session_duration);
          data.append("department_id", this.editedItem.department_id);
          data.append("image", this.editedItem.image);

          this.addData({
            url: "dashboard/doctors",
            data: data,
          }).then((res) => {
            console.log(res);
            this.desserts.unshift(res);

            this.close();
          });
        }
      }
    },

    goToDoctorProfile(event, { item }) {
      console.log(event);
      console.log(item.id);
      this.$router.push({
        name: "DoctorProfile",
        params: { id: item.id },
      });
    },
  },
};
</script>

<style lang="scss"></style>
