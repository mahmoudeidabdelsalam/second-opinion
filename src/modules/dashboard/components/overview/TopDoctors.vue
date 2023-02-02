<template>
  <section class="top-doctors pa-5 white rounded-lg">
    <span class="d-block mb-5 subtitle-1 font-weight-bold">
      الاطباء المميزين
    </span>

    <v-row>
      <v-col
        cols="12"
        xl="4"
        lg="4"
        md="6"
        v-for="doctor in doctors"
        :key="doctor.id"
      >
        <div class="doctor rounded-lg pa-4" style="height: 100%">
          <div class="mb-5 d-flex justify-start align-center">
            <v-avatar size="100">
              <v-img
                :src="doctor.profile"
                :lazy-src="doctor.profile"
                :alt="doctor.name"
                cover
              ></v-img>
            </v-avatar>

            <div class="doctor-details pr-4">
              <span
                class="d-block subtitle-1 font-weight-bold black--text mb-2"
              >
                {{ doctor.name }}
              </span>
              <span class="d-block subtitle-2 font-weight-bold secondary--text">
                {{ doctor.title }}
              </span>
            </div>
          </div>

          <div class="footer d-flex justify-space-around align-center">
            <div class="box d-flex justify-start align-center">
              <v-icon size="20" color="primary">mdi-video</v-icon>
              <span class="mx-2 subtitle-1 font-weight-medium">
                {{ doctor.calls }}
              </span>
              <span class="subtitle-2 font-weight-medium">استشارة مرئية</span>
            </div>

            <div class="box d-flex justify-start align-center mr-4">
              <v-icon size="20" color="secondary">mdi-file</v-icon>
              <span class="mx-2 subtitle-1 font-weight-medium">
                {{ doctor.chats }}
              </span>
              <span class="subtitle-2 font-weight-medium">استشارة كتابية</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "TopDoctors",

  props: {
    doctors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.top-doctors {
  .doctor {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;

    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      transform: translateY(-3px);
    }
  }
}
</style>
