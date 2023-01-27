<template>
  <main class="appointments pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الحجوزات
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <div class="upcoming mb-10">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد القادمة
        </span>

        <upcoming
          :upcoming="upcoming"
          :waitingForData="waitingForData"
          @initData="initData"
        />
      </div>

      <div class="expired mb-10">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد المنتهية
        </span>

        <expired :expired="expired" :waitingForData="waitingForData" />
      </div>

      <div class="cancelled mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد الملغية
        </span>

        <cancelled :canceled="canceled" :waitingForData="waitingForData" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Appointments",

  components: {
    // upcoming
    upcoming: () => import("../components/appointments/Upcoming.vue"),
    // expired
    expired: () => import("../components/appointments/Expired.vue"),
    // canceled
    cancelled: () => import("../components/appointments/Cancelled.vue"),
  },

  data: () => ({
    // waiting for data
    waitingForData: false,

    // appointments
    // upcoming
    upcoming: [],
    // expired
    expired: [],
    // canceled
    canceled: [],
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
      // get appointments
      this.getData(`patient/reservations?type=1`).then((res) => {
        // upcoming
        this.upcoming = res.filter((item) => item.status.value == 0);
        // expired
        this.expired = res.filter((item) => item.status.value == 3);
        // canceled
        this.canceled = res.filter((item) => item.status.value == 2);

        this.waitingForData = false;
      });
    },
  },
};
</script>
