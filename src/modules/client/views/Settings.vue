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
        <v-btn
          text
          class="primary--text font-weight-bold"
          @click="openUpdateNameModal"
        >
          تعديل
        </v-btn>
      </div>
      <!-- update name dialog -->
      <v-dialog v-model="updateNameModal" persistent max-width="400">
        <v-card>
          <v-toolbar class="mb-5" elevation="0">
            <v-toolbar-title>تعديل اسم المستخدم</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="updateNameModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" :v-model="valid" lazy-validation>
              <v-text-field
                v-model="nameForm.name"
                :rules="nameRules"
                label="الاسم"
                outlined
                dense
                autofocus
              ></v-text-field>

              <v-btn
                class="mt-3 white--text"
                color="primary"
                block
                :loading="updateNameLoading"
                :disabled="updateNameLoading"
                @click="updateName"
              >
                تعديل
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- national id -->
      <div
        class="setting mb-5 d-flex justify-space-between align-center"
        style="max-width: 700px"
      >
        <span class="primary--text font-weight-bold">الرقم القومى</span>
        <span class="secondary--text font-weight-bold">
          {{ user.national_id }}
        </span>
        <v-btn
          text
          class="primary--text font-weight-bold"
          @click="openUpdateNationalIdModal"
        >
          تعديل
        </v-btn>
      </div>
      <!-- update national id dialog -->
      <v-dialog v-model="updateNationalIdModal" persistent max-width="400">
        <v-card>
          <v-toolbar class="mb-5" elevation="0">
            <v-toolbar-title>تعديل الرقم القومى</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="updateNationalIdModal = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" :v-model="valid" lazy-validation>
              <v-text-field
                v-model="nationalIdForm.national_id"
                :rules="nationalIdRules"
                label="الرقم القومى"
                type="number"
                outlined
                dense
                autofocus
              ></v-text-field>

              <v-btn
                class="mt-3 white--text"
                color="primary"
                block
                :loading="updateNationalIdLoading"
                :disabled="updateNationalIdLoading"
                @click="updateNationalId"
              >
                تعديل
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Settings",

  data: () => ({
    // buttons loader
    loader: null,
    updateNameLoading: false,
    updateNationalIdLoading: false,

    // update name dialog
    updateNameModal: false,
    // update national id dialog
    updateNationalIdModal: false,

    // name form
    nameForm: {
      name: "",
    },

    // national id form
    nationalIdForm: {
      national_id: "",
    },
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      nameRules: "validationRules/nameRules",
      nationalIdRules: "validationRules/nationalIdRules",

      user: "user/userData",
    }),
  },

  methods: {
    ...mapActions({
      updateNameAction: "settings/updateProfile",
      updateNationalIdAction: "settings/updateProfile",
    }),

    // open update name dialog
    openUpdateNameModal() {
      this.updateNameModal = true;
      this.nameForm.name = this.user.full_name;
    },

    // update name
    updateName() {
      // validate form
      if (this.$refs.form.validate()) {
        this.updateNameLoading = true;
        this.updateNameAction(this.nameForm)
          .then(() => {
            this.updateNameLoading = false;
            this.updateNameModal = false;
          })
          .catch(() => {
            this.updateNameLoading = false;
          });
      }
    },

    // open update national id dialog
    openUpdateNationalIdModal() {
      this.updateNationalIdModal = true;
      this.nationalIdForm.national_id = this.user.national_id;
    },

    // update national id
    updateNationalId() {
      // validate form
      if (this.$refs.form.validate()) {
        this.updateNationalIdLoading = true;
        this.updateNationalIdAction(this.nationalIdForm)
          .then(() => {
            this.updateNationalIdLoading = false;
            this.updateNationalIdModal = false;
          })
          .catch(() => {
            this.updateNationalIdLoading = false;
          });
      }
    },
  },
};
</script>
