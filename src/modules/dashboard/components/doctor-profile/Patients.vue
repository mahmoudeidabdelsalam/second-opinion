<template>
  <v-card flat>
    <v-data-table
      :headers="headers"
      :items="patients"
      :loading="loadingData"
      :search="search"
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
            المرضى
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-text-field
          v-model="search"
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
        <span class="d-block font-weight-medium">
          {{ item.name }}
        </span>
      </template>

      <template v-slot:[`item.email`]="{ item }">
        <span class="d-block">
          {{ item.email }}
        </span>
      </template>

      <template v-slot:[`item.phone_number`]="{ item }">
        <span class="d-block">
          {{ item.phone_number }}
        </span>
      </template>

      <template v-slot:[`item.info`]="{ item }">
        <span class="d-block"> النوع: {{ item.gender.text }} </span>
        <span class="d-block"> العمر: {{ item.age }} </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "Patients",

  props: {
    patients: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    // loading data
    loadingData: false,

    headers: [
      { text: "المريض", value: "name" },
      { text: "البريد الالكترونى", value: "email" },
      { text: "رقم الهاتف", value: "phone_number" },
      { text: "النوع و العمر", value: "info", sortable: false },
    ],

    // search
    search: "",
  }),
};
</script>
