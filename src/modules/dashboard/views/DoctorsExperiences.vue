<template>
  <transition name="slide-fade" v-if="loaded">
    <section class="data-table-page white rounded-lg pa-5">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="singleSelect"
        item-key="id"
        show-select
        multi-sort
        sort-by="id"
        sort-desc
        no-data-text="No doctors experiences."
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="black--text font-weight-medium">
              Doctors experiences
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px" scrollable>
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
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="editedItem.doctor_id"
                            :items="doctors"
                            :rules="selectRules"
                            label="Doctor"
                            outlined
                            dense
                          ></v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.hospital_en"
                            :rules="nameRules"
                            label="English hospital name"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.hospital_ar"
                            :rules="nameRules"
                            label="Arabic hospital name"
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
                            label="English experience description"
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
                            label="Arabic experience description"
                            outlined
                            dense
                            auto-grow
                            rows="2"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-menu
                            v-model="menuFrom"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.from"
                                label="From"
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
                              v-model="editedItem.from"
                              @input="menuFrom = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-menu
                            v-model="menuTo"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.to"
                                label="To"
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
                              v-model="editedItem.to"
                              @input="menuTo = false"
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
                    Cancel
                  </v-btn>
                  <v-btn color="primary" depressed small @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- delete item -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">
                  Are you sure you want to delete this doctors experiences?
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
          </v-toolbar>
        </template>

        <template v-slot:[`item.doctor`]="{ item }">
          <div class="d-flex justify-start align-center">
            <v-avatar class="mr-4" size="50">
              <v-img
                cover
                :lazy-src="item.doctor.profile"
                max-height="50"
                max-width="50"
                :src="item.doctor.profile"
                :alt="item.doctor.full_name"
              ></v-img>
            </v-avatar>
            <div>
              <span class="d-block black--text font-weight-bold">
                {{ item.doctor.full_name }}
              </span>
              <span class="d-block black--text font-weight-bold">
                {{ item.doctor.title }}
              </span>
              <span class="d-block black--text font-weight-bold">
                {{ item.doctor.email }}
              </span>
              <span class="d-block black--text font-weight-bold">
                {{ item.doctor.phone_number }}
              </span>
            </div>
          </div>
        </template>

        <template v-slot:[`item.experiences`]="{ item }">
          <span class="d-block black--text">
            {{ item.title }}
          </span>
          <span class="d-block black--text">
            {{ item.hospital }}
          </span>
        </template>

        <template v-slot:[`item.time`]="{ item }">
          <span class="d-block black--text"> From: {{ item.from }} </span>
          <span class="d-block black--text"> To: {{ item.to }} </span>
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
  name: "DoctorsExperiences",

  data: () => ({
    loaded: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Doctor", value: "doctor" },
      { text: "Experiences", value: "experiences" },
      { text: "Time", value: "time" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    // doctors
    doctors: [],
    // selected rows
    singleSelect: false,
    selected: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      hospital_en: "",
      hospital_ar: "",
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      from: "",
      to: "",
      doctor_id: "",
    },
    defaultItem: {
      id: "",
      hospital_en: "",
      hospital_ar: "",
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      from: "",
      to: "",
      doctor_id: "",
    },
    // date picker
    menuFrom: false,
    menuTo: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "New doctors experiences"
        : "Edit doctors experiences";
    },

    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      descriptionRules: "validationRules/descriptionRules",
      emailRules: "validationRules/emailRules",
      phoneRules: "validationRules/phoneRules",
      selectRules: "validationRules/selectRules",
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
        // get doctors experiences
        this.getData("dashboard/doctors-experiences").then((res) => {
          this.desserts = res;
        });

        this.loaded = true;

        // get doctors
        this.getData("dashboard/doctors").then((res) => {
          this.doctors = res.map((item) => {
            return {
              text: item.full_name,
              value: item.id,
            };
          });
        });
      }, 0);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // get single item data from show api
      this.getData(`dashboard/doctors-experiences/${item.id}`).then((res) => {
        this.editedItem = Object.assign(
          {},
          {
            id: res.id,
            hospital_en: res.en.hospital,
            hospital_ar: res.ar.hospital,
            title_en: res.en.title,
            title_ar: res.ar.title,
            description_en: res.en.description,
            description_ar: res.ar.description,
            from: res.from,
            to: res.to,
            doctor_id: res.doctor.id,
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
        url: "dashboard/doctors-experiences",
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
        data.append("hospital:en", this.editedItem.hospital_en);
        data.append("hospital:ar", this.editedItem.hospital_ar);
        data.append("title:en", this.editedItem.title_en);
        data.append("title:ar", this.editedItem.title_ar);
        data.append("description:en", this.editedItem.description_en);
        data.append("description:ar", this.editedItem.description_ar);
        data.append("from", this.editedItem.from);
        data.append("to", this.editedItem.to);
        data.append("doctor_id", this.editedItem.doctor_id);
        data.append("_method", "PUT");

        await this.updateData({
          url: `dashboard/doctors-experiences/${this.editedItem.id}`,
          data: data,
        }).then((res) => {
          Object.assign(this.desserts[this.editedIndex], res);
          this.close();
        });
      } else {
        if (this.$refs.form.validate()) {
          let data = new FormData();
          data.append("hospital:en", this.editedItem.hospital_en);
          data.append("hospital:ar", this.editedItem.hospital_ar);
          data.append("title:en", this.editedItem.title_en);
          data.append("title:ar", this.editedItem.title_ar);
          data.append("description:en", this.editedItem.description_en);
          data.append("description:ar", this.editedItem.description_ar);
          data.append("from", this.editedItem.from);
          data.append("to", this.editedItem.to);
          data.append("doctor_id", this.editedItem.doctor_id);

          this.addData({
            url: "dashboard/doctors-experiences",
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
