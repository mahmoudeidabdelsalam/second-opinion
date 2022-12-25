<template>
  <main class="notifications pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      Notifications
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <div
        class="notification pa-5 rounded-lg secondary_bg mb-5"
        v-for="notification in 5"
        :key="notification"
      >
        <span class="d-block font-weight-bold mb-2 primary--text text-h6">
          You have an appointment in 15 minutes
        </span>
        <p class="secondary--text mb-5">
          Reminder of the consultation appointment on Saturday, November 12,
          2022, stay for 15 minutes
        </p>
        <span class="secondary--text body-2">November 6, 2021, 10:43 am</span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "notifications.scss",
};
</script>

<style lang="scss" scoped>
@import "../style/notifications.scss";
</style>
