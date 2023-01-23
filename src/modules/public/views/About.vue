<template>
  <main class="about">
    <div class="bg d-flex align-center">
      <v-container>
        <div class="box py-3 px-15 mx-auto mt-auto rounded-t-lg text-center">
          <span class="d-block primary--text font-weight-bold text-h5 mb-1">
            من نحن ؟
          </span>
          <span class="d-block secondary--text font-weight-regular">
            Second opinion
          </span>
        </div>
      </v-container>
    </div>

    <v-container style="max-width: 1158px" class="pb-16">
      <p
        class="text-center mx-auto mb-16 text-h5 font-weight-medium primary--text"
        style="max-width: 1135px; margin-top: 80px; line-height: 2"
      >
        منصة تجمع بين المريض والأطباء النخبة في التخصصات الطبية الدقيقة ، حيث
        تقدم للمريض تجربة حجز موعد في عيادة افتراضية اونلاين ، لأخذ رأي طبي ثاني
        أو لطلب استشارة مكتوبة وفق المواعيد التي يحددها الطبيب مسبقاً.
      </p>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="scss" scoped>
.about {
  background-color: #f8fbff;
  .bg {
    background: url(../../../assets/images/bg-image.webp) no-repeat center top;
    background-size: cover;
    height: 356px;
    position: relative;
  }

  .box {
    width: max-content;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f8fbff;
  }
}
</style>
