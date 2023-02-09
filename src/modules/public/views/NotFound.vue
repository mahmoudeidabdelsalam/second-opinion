<template>
  <section class="not-found d-flex justify-center align-center">
    <div class="text-center">
      <img src="@/assets/images/404.webp" alt="404 Not found" />
      <span class="d-block mb-3 primary--text text-h5 font-weight-medium">
        الصفحة غير موجودة
      </span>
      <p>الصفحة التى تحاول الوصول اليها غير موجودة او تمت ازالتها من النظام</p>
      <v-btn class="primary py-6 px-10" depressed link :to="{ name: 'Home' }">
        العودة الى الرئيسية
      </v-btn>
    </div>
  </section>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 80vh;

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
  }
}
</style>
