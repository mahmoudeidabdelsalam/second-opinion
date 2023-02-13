<template>
  <section class="departments mb-16">
    <v-container style="max-width: 1180px">
      <div
        class="departments-tags mx-auto text-center"
        style="max-width: 1000px; min-height: 128px"
      >
        <v-btn
          v-for="department in departments.slice(0, 9)"
          :key="department.value"
          class="primary rounded-lg py-7 ma-1 text-subtitle-1 font-weight-medium"
          link
          :to="{
            name: 'PublicDoctors',
            query: { department_id: department.value },
          }"
        >
          {{ department.text }}
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Departments",

  data: () => ({
    // departments
    departments: [],
  }),

  created() {
    // init data
    this.initData();
  },

  methods: {
    // init data
    initData() {
      // get departments
      this.axios
        .get(`patient/departments`)
        .then((response) => {
          this.departments = response.data.data.map((item) => {
            return {
              text: item.name,
              value: item.id,
            };
          });
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>

<style></style>
