<template>
  <main class="notifications pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الاشعارات
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <div
        class="notification pa-5 rounded-lg white mb-5"
        v-for="notification in notifications"
        :key="notification.id"
      >
        <span class="d-block font-weight-bold mb-2 primary--text text-h6">
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
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Notifications",

  data: () => ({
    // notifications
    notifications: [],
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
      // get notifications
      this.getData(`notifications`).then((res) => {
        this.notifications = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/notifications.scss";
</style>
