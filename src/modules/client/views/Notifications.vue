<template>
  <main class="notifications pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الاشعارات
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <div
        class="notification pa-5 rounded-lg secondary_bg mb-5"
        v-for="notification in 3"
        :key="notification"
      >
        <span class="d-block font-weight-bold mb-2 primary--text text-h6">
          لديك موعد بعد 15 دقيقة
        </span>
        <p class="secondary--text mb-5">
          تذكير بموعد الإستشارة يوم السبت الموافق 12 نوفمبر 2022، بقى على موعدك
          15 دقيقة
        </p>
        <span class="secondary--text body-2">
          6 نوفمبر 2021, 10:43 صباحاً
        </span>
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
