<template>
  <main class="settings pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الاعدادات
    </span>

    <div class="settings-board white elevation-3 pa-5 rounded-lg">
      <!-- name -->
      <div
        class="setting mb-5 d-flex justify-space-between align-center"
        style="max-width: 700px"
      >
        <span class="primary--text font-weight-bold">الاسم</span>
        <span class="secondary--text font-weight-bold">
          {{ user.full_name }}
        </span>

        <!-- update name dialog -->
        <v-dialog v-model="nameDialog" persistent max-width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              class="primary--text font-weight-bold"
              @click="bindData"
            >
              تعديل
            </v-btn>
          </template>
          <v-card>
            <v-toolbar class="mb-5" elevation="0">
              <v-toolbar-title>تعديل اسم المستخدم</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.stop="nameDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-form ref="form" :v-model="valid">
                <v-text-field
                  v-model="form.name"
                  :rules="nameRules"
                  label="اسم المستخدم"
                  outlined
                  autofocus
                ></v-text-field>

                <v-btn
                  class="mt-3 py-6 white--text"
                  color="primary"
                  block
                  @click="updateUser"
                >
                  تعديل
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>

      <!-- national id -->
      <div
        class="setting mb-5 d-flex justify-space-between align-center"
        style="max-width: 700px"
      >
        <span class="primary--text font-weight-bold">رقم الهوية</span>
        <span class="secondary--text font-weight-bold">
          {{ user.national_id }}
        </span>

        <!-- update national id dialog -->
        <v-dialog v-model="nationalIdDialog" persistent max-width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              class="primary--text font-weight-bold"
              @click="bindData"
            >
              تعديل
            </v-btn>
          </template>
          <v-card>
            <v-toolbar class="mb-5" elevation="0">
              <v-toolbar-title>تعديل رقم الهوية</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.stop="nationalIdDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-form ref="form" :v-model="valid">
                <v-text-field
                  v-model="form.national_id"
                  :rules="nationalIdRules"
                  label="رقم الهوية"
                  type="number"
                  outlined
                  autofocus
                ></v-text-field>

                <v-btn
                  class="mt-3 py-6 white--text"
                  color="primary"
                  block
                  @click="updateUser"
                >
                  تعديل
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>

      <!-- birthday -->
      <div
        class="setting mb-5 d-flex justify-space-between align-center"
        style="max-width: 700px"
      >
        <span class="primary--text font-weight-bold">تاريخ الميلاد</span>
        <span class="secondary--text font-weight-bold">
          {{ user.birthday }}
        </span>

        <!-- update birthday dialog -->
        <v-dialog v-model="birthdayDialog" persistent max-width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              class="primary--text font-weight-bold"
              @click="bindData"
            >
              تعديل
            </v-btn>
          </template>
          <v-card>
            <v-toolbar class="mb-5" elevation="0">
              <v-toolbar-title>تعديل تاريخ الميلاد</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.stop="birthdayDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-form ref="form" :v-model="valid">
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
                      v-model="form.birthday"
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
                    v-model="form.birthday"
                    :max="maxDate"
                    @input="menu = false"
                    @change="updateUser"
                  ></v-date-picker>
                </v-menu>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>

      <!-- gender -->
      <div
        class="setting mb-5 d-flex justify-space-between align-center"
        style="max-width: 700px"
      >
        <span class="primary--text font-weight-bold">النوع</span>
        <span class="secondary--text font-weight-bold">
          {{ user.gender }}
        </span>

        <!-- update gender dialog -->
        <v-dialog v-model="genderDialog" persistent max-width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
              class="primary--text font-weight-bold"
              @click="bindData"
            >
              تعديل
            </v-btn>
          </template>
          <v-card>
            <v-toolbar class="mb-5" elevation="0">
              <v-toolbar-title>تعديل النوع</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.stop="genderDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-form ref="form" :v-model="valid">
                <v-select
                  v-model="form.gender"
                  :items="genders"
                  :rules="selectRules"
                  label="النوع"
                  outlined
                ></v-select>

                <v-btn
                  class="mt-3 py-6 white--text"
                  color="primary"
                  block
                  @click="updateUser"
                >
                  تعديل
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Settings",

  data: () => ({
    // update name dialog
    nameDialog: false,

    // update national id dialog
    nationalIdDialog: false,

    // update birthday dialog
    birthdayDialog: false,
    // menu
    menu: false,
    // max date
    maxDate: new Date().toISOString().substr(0, 10),

    // update gender dialog
    genderDialog: false,

    genders: [
      { text: "ذكر", value: "m" },
      { text: "أنثى", value: "f" },
    ],

    // form
    form: {
      name: "",
      national_id: "",
      birthday: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      nationalIdRules: "validationRules/nationalIdRules",
      selectRules: "validationRules/selectRules",

      user: "user/userData",
    }),
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
    }),

    // bind data
    bindData() {
      this.form.name = this.user.full_name;
      this.form.national_id = this.user.national_id;
      this.form.birthday = this.user.birthday;
      this.form.gender = this.user.gender;
    },

    // update user
    updateUser() {
      // validate form
      if (this.$refs.form.validate()) {
        let data = new URLSearchParams();
        data.append("name", this.form.name);
        data.append("national_id", this.form.national_id);
        data.append("birthday", this.form.birthday);
        data.append("gender", this.form.gender);

        this.axios
          .put(`patient/profile`, data, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            // commit the set user data mutation
            this.$store.commit("login/SET_USER", response.data.data);
            this.closeAllDialogs();
            this.handleResponse(response);
          })
          .catch((error) => {
            this.handleResponse(error.response);
          });
      }
    },

    // close all dialogs
    closeAllDialogs() {
      this.nameDialog = false;
      this.nationalIdDialog = false;
      this.birthdayDialog = false;
      this.menu = false;
    },
  },
};
</script>
