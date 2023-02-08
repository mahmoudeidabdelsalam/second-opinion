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
          @assignNewData="assignData"
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
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      this.waitingForData = true;

      // get appointments
      this.axios
        .get(`patient/reservations?type=1`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          // upcoming
          this.upcoming = response.data.data.filter(
            (item) => item.status.value == 1
          );
          // expired
          this.expired = response.data.data.filter(
            (item) => item.status.value == 2
          );
          // canceled
          this.canceled = response.data.data.filter(
            (item) => item.status.value == 3
          );

          this.waitingForData = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },

    // assign data
    assignData(data) {
      // loop on upcoming appointments to assign new data ti spacified appointment id
      this.upcoming = this.upcoming.map((item) => {
        if (item.id == data.id) {
          item = data;
        }
        return item;
      });
    },
  },
};
</script>
