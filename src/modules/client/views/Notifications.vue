<template>
  <main class="notifications pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الاشعارات
    </span>

    <div v-if="!waitingForData">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="
          'notification pa-5 mb-5 rounded-lg' +
          (notification.read_at ? ' borderd' : ' primary_bg')
        "
      >
        <span class="d-block font-weight-bold mb-2 black--text text-h6">
          {{ notification.title }}
        </span>
        <p class="secondary--text mb-5">
          {{ notification.body }}
        </p>
        <span class="d-block mb-3 secondary--text body-2">
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
        <v-btn
          v-if="!notification.read_at"
          class="primary--text"
          text
          small
          @click="markAsRead(notification.id)"
        >
          تحديد كمقروء
        </v-btn>
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

    // mark as read
    markAsRead(id) {
      this.axios
        .put(
          `notifications/${id}/read`,
          {},
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .then((response) => {
          this.handleResponse(response);

          // update notifications
          this.notifications = this.notifications.map((notification) => {
            if (notification.id == id) {
              notification.read_at = new Date();
            }

            return notification;
          });
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
