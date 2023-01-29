<template>
  <section class="statistics" style="height: 100%">
    <v-row>
      <v-col
        cols="12"
        xl="3"
        lg="3"
        md="4"
        sm="6"
        v-for="box in boxs"
        :key="box.id"
      >
        <router-link
          :to="{ name: 'Departments' }"
          class="box d-flex justify-start align-center pa-5 white rounded-lg"
        >
          <v-icon
            class="primary_bg pa-4 rounded-circle"
            size="30"
            color="primary"
          >
            {{ box.icon }}
          </v-icon>

          <div class="text pr-5">
            <span class="d-block title font-weight-bold black--text">
              {{ box.count }}
            </span>
            <span class="secondary--text font-weight-medium subtitle-2">
              {{ box.title }}
            </span>
          </div>
        </router-link>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "Statistics",

  data: () => ({
    boxs: [
      {
        id: 1,
        icon: "mdi-handshake",
        title: "الاقسام",
        count: 112,
      },
      {
        id: 2,
        icon: "mdi-account-multiple",
        title: "الموظفين",
        count: 67,
      },
      {
        id: 3,
        icon: "mdi-doctor",
        title: "الاطباء",
        count: 89,
      },
      {
        id: 4,
        icon: "mdi-clipboard-account",
        title: "المساعدين",
        count: 163,
      },
      {
        id: 5,
        icon: "mdi-shield",
        title: "الصلاحيات",
        count: 4,
      },
      {
        id: 6,
        icon: "mdi-account-group",
        title: "المرضى",
        count: 1063,
      },
      {
        id: 7,
        icon: "mdi-video",
        title: "الحجوزات المرئية",
        count: 62,
      },
      {
        id: 8,
        icon: "mdi-file",
        title: "الحجوزات الكتابية",
        count: 25,
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.statistics {
  .box {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    height: 100%;

    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      transform: translateY(-3px);
    }
  }
}
</style>
