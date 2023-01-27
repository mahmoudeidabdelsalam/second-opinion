<template>
  <main class="medical-reports pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      التقارير
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <!-- sent -->
      <div class="sents mb-10">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          التقارير المرسلة
        </span>
        <v-row v-if="!waitingForData && sents.length > 0">
          <v-col cols="12" md="6" v-for="report in sents" :key="report.id">
            <div class="report rounded-lg overflow-hidden">
              <div
                class="head primary_dark d-flex flex-column flex-sm-row justify-sm-space-between justify-start align-start pa-3"
              >
                <div class="mb-2">
                  <v-icon color="white"> mdi-calendar </v-icon>
                  <span class="white--text mx-2">استشارة كتابية</span>
                </div>
                <v-icon color="white">mdi-file-multiple</v-icon>
              </div>
              <div class="body primary py-5 px-3">
                <div class="doctor mb-5 d-flex justify-start align-center">
                  <div class="doctor-info px-2">
                    <span class="d-block mb-2 font-weight-bold white--text">
                      تم طلب تقرير طبى عن حالة مرضية
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      {{ report.doctor.name }}
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      {{ report.doctor.title }}
                    </span>
                  </div>
                </div>
                <v-btn
                  block
                  depressed
                  link
                  :to="{
                    name: 'ClientMedicalReportsProfile',
                    params: { id: report.id },
                  }"
                  class="white primary--text font-weight-bold"
                >
                  مشاهدة الملفات المرفقة
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- waiting for data -->
        <v-skeleton-loader
          v-if="waitingForData && sents.length == 0"
          max-width="300"
          type="card"
        ></v-skeleton-loader>

        <!-- no data -->
        <div
          v-if="!waitingForData && sents.length == 0"
          class="d-flex flex-column align-center justify-center"
        >
          <v-avatar class="mb-5" size="120">
            <v-img
              :src="require('@/assets/images/envelope-no-data.webp')"
              :lazy-src="require('@/assets/images/envelope-no-data.webp')"
              cover
            ></v-img>
          </v-avatar>
          <span class="d-block mb-5 font-weight-bold primary--text">
            ليس لديك تقارير حتى الان
          </span>
          <v-btn
            class="px-10"
            color="primary"
            depressed
            link
            :to="{ name: 'PublicDoctors' }"
          >
            ابحث عن طبيب
          </v-btn>
        </div>
      </div>

      <!-- received -->
      <div class="received">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          التقارير المستلمة
        </span>

        <v-row v-if="!waitingForData && received.length > 0">
          <v-col cols="12" md="6" v-for="report in received" :key="report.id">
            <div class="report rounded-lg overflow-hidden">
              <div
                class="head grey_dark d-flex flex-column flex-sm-row justify-sm-space-between justify-start align-start pa-3"
              >
                <div class="mb-2">
                  <v-icon color="white"> mdi-calendar </v-icon>
                  <span class="white--text mx-2">استشارة كتابية</span>
                </div>
                <v-icon color="white">mdi-file-multiple</v-icon>
              </div>
              <div class="body grey py-5 px-3">
                <div class="doctor mb-5 d-flex justify-start align-center">
                  <div class="doctor-info px-2">
                    <span class="d-block mb-2 font-weight-bold white--text">
                      تم طلب تقرير طبى عن حالة مرضية
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      {{ report.doctor.name }}
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      {{ report.doctor.title }}
                    </span>
                  </div>
                </div>
                <v-btn
                  block
                  depressed
                  link
                  :to="{
                    name: 'ClientMedicalReportsProfile',
                    params: { id: report.id },
                  }"
                  class="white secondary--text font-weight-bold"
                >
                  مشاهدة الملفات المرفقة
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- waiting for data -->
        <v-skeleton-loader
          v-if="waitingForData && received.length == 0"
          max-width="300"
          type="card"
        ></v-skeleton-loader>

        <!-- no data -->
        <div
          v-if="!waitingForData && received.length == 0"
          class="d-flex flex-column align-center justify-center"
        >
          <v-avatar class="mb-5" size="120">
            <v-img
              :src="require('@/assets/images/envelope-no-data.webp')"
              :lazy-src="require('@/assets/images/envelope-no-data.webp')"
              cover
            ></v-img>
          </v-avatar>
          <span class="d-block mb-5 font-weight-bold primary--text">
            ليس لديك مستلمة حتى الان
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MedicalReports",

  data: () => ({
    // waiting for data
    waitingForData: false,

    // medical reports
    // sents
    sents: [],
    // received
    received: [],
  }),

  created() {
    // init data
    this.initData();
  },

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
    }),

    // init data
    initData() {
      this.waitingForData = true;
      // get reports
      this.getData(`patient/reservations?type=2`).then((res) => {
        // sents
        this.sents = res.filter((item) => item.status.value == 0);

        // received
        this.received = res.filter((item) => item.status.value == 3);

        this.waitingForData = false;
      });
    },
  },
};
</script>
