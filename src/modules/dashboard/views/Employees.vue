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
        no-data-text="No employees."
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="black--text font-weight-medium">
              Employees
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
                            v-model="editedItem.en_name"
                            :rules="nameRules"
                            label="English name"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="editedItem.ar_name"
                            :rules="nameRules"
                            label="Arabic name"
                            outlined
                            dense
                          ></v-text-field>
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
                            v-model="editedItem.phone"
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
                            :rules="selectRules"
                            :items="genders"
                            label="Gender"
                            outlined
                            dense
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-select
                            v-model="editedItem.role"
                            :rules="selectRules"
                            :items="roles"
                            label="Role"
                            outlined
                            dense
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                          <file-pond
                            ref="pond"
                            label-idle="Drag & Drop your files or <span class='filepond--label-action'> Browse </span>"
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
                  Export
                </v-btn>
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-tray-arrow-down</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Export to excel</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-tray-arrow-down</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Export to pdf</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- import btn -->
            <v-btn color="primary" dark depressed>Import</v-btn>

            <!-- delete item -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">
                  Are you sure you want to delete this department?
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
            {{ item.phone }}
          </span>
        </template>

        <template v-slot:[`item.services`]="{ item }">
          <v-btn class="primary--text" icon link :to="{ name: item.id }">
            <v-icon small>mdi-launch</v-icon>
          </v-btn>
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
import { mapGetters } from "vuex";

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
  name: "Employees",

  components: {
    FilePond,
  },

  data: () => ({
    loaded: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Contacts", value: "contacts" },
      { text: "Services", value: "services", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    // selected rows
    singleSelect: false,
    selected: [],
    editedIndex: -1,
    editedItem: {
      en_name: "",
      ar_name: "",
      email: "",
      phone: "",
      gender: "",
      role: "",
      image: "",
    },
    defaultItem: {
      en_name: "",
      ar_name: "",
      email: "",
      phone: "",
      gender: "",
      role: "",
      image: "",
    },

    // genders
    genders: [
      {
        text: "Male",
        value: 1,
      },
      {
        text: "Female",
        value: 2,
      },
    ],

    // roles
    roles: [
      {
        text: "Admin",
        value: 1,
      },
      {
        text: "Employee",
        value: 2,
      },
      {
        text: "Doctor",
        value: 3,
      },
      {
        text: "Assistant",
        value: 4,
      },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Employee" : "Edit Employee";
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
    // init data
    initData() {
      setTimeout(() => {
        this.desserts = [
          {
            id: 1,
            name: "Mohamed Omar",
            description: "test description",
            email: "mohamed@gmail.com",
            phone: "01201456635",
            gender: {
              text: "Male",
              value: 1,
            },
            role: {
              text: "Admin",
              value: 1,
            },
          },
        ];
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
      this.editedItem = Object.assign(
        {},
        {
          en_name: item.name,
          en_description: item.description,
          email: item.email,
          phone: item.phone,
          gender: item.gender,
          role: item.role,
        }
      );
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      // reset validation
      this.$refs.form.resetValidation();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.close();
      } else {
        if (this.$refs.form.validate()) {
          this.desserts.unshift(this.editedItem);
          this.close();
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
