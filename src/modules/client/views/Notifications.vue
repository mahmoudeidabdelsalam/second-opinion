<template>
  <main class="notifications pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الاشعارات
    </span>

    <div class="content pa-5 elevation-3 rounded-lg" v-if="!waitingForData">
      <div
        class="notification pa-5 rounded-lg white mb-5"
        v-for="notification in notifications"
        :key="notification.id"
      >
        <span class="d-block font-weight-bold mb-2 black--text text-h6">
          {{ notification.title }}
        </span>
        <p class="secondary--text mb-5">
          {{ notification.body }}
        </p>
        <span class="secondary--text body-2">
          {{
            notification.created_at.day +
            " " +
            notification.created_at.month +
            " " +
            notification.created_at.year +
            ", " +
            notification.created_at.time
          }}
        </span>
      </div>

      <!-- no data -->
      <div
        v-if="!waitingForData && notifications.length == 0"
        class="d-flex flex-column align-center justify-center"
      >
        <v-icon class="mb-5 primary--text" size="90">mdi-bell-off</v-icon>
        <span class="d-block font-weight-bold primary--text">
          ليس لديك اشعارات حتى الان
        </span>
      </div>
    </div>

    <!-- waiting for data -->
    <v-skeleton-loader v-else max-width="300" type="card"></v-skeleton-loader>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Notifications",

  data: () => ({
    // waiting for data
    waitingForData: false,

    // notifications
    notifications: [],
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

      // get notifications
      this.axios
        .get(`notifications`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          this.notifications = response.data.data;

          this.waitingForData = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/notifications.scss";
</style>
