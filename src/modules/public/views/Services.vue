<template>
  <main class="services">
    <div class="bg d-flex align-center">
      <v-container>
        <div class="box py-3 px-15 mx-auto mt-auto rounded-t-lg text-center">
          <span class="d-block primary--text font-weight-bold text-h5 mb-1">
            خدماتنا
          </span>
          <span class="d-block secondary--text font-weight-regular">
            لماذا Second opinion ؟
          </span>
        </div>
      </v-container>
    </div>

    <v-container style="max-width: 1158px" class="pb-16">
      <p
        class="text-center mx-auto mb-16 text-h5 font-weight-medium primary--text"
        style="max-width: 1135px; margin-top: 80px; line-height: 2"
      >
        نسعى الى تحسين جودة رعاية المريض حيث نجمع الأطباء الأكثر تميزا في
        التخصصات الطبية الدقيقة لتكوين شبكة محدودة من اكثر الأطباء كفاءة . يمنحك
        سكند اوبينين تجربة مميزة لإستشارة أفضل الأطباء دون عناء التأخير ودون
        تحمل تكاليف إضافية.
      </p>

      <v-row class="align-center">
        <v-col cols="12" md="4">
          <div
            class="text-box text-center d-flex justify-center align-center white pa-4 rounded-lg"
          >
            <p class="paragraph secondary--text font-weight-regular ma-0">
              توفير الوقت وعناء وتكاليف السفر
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div
            class="text-box center-box text-center d-flex justify-center align-center primary_bg pa-4 rounded-lg"
          >
            <p class="paragraph secondary--text font-weight-regular ma-0">
              نسعى الى تحسين جودة رعاية المريض حيث نجمع الأطباء الأكثر تميزا في
              التخصصات الطبية الدقيقة لتكوين شبكة محدودة من اكثر الأطباء كفاءة
              يمنحك سكند اوبينين تجربة مميزة لإستشارة أفضل الأطباء دون عناء
              التأخير ودون تحمل تكاليف إضافية.
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div
            class="text-box text-center d-flex justify-center align-center white pa-4 rounded-lg"
          >
            <p class="paragraph secondary--text font-weight-regular ma-0">
              تقديم خدمة عملاء ودعم فني على مدار الساعة
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div
            class="text-box text-center d-flex justify-center align-center white pa-4 rounded-lg"
          >
            <p class="paragraph secondary--text font-weight-regular ma-0">
              واجهة مستخدم سهلة وبسيطة مزودة بتقنيات عالية
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div
            class="text-box center-box text-center d-flex justify-center align-center primary_bg pa-4 rounded-lg"
          >
            <p class="paragraph secondary--text font-weight-regular ma-0">
              الحصول على رأي طبي ثاني او استشاره مكتوبة مع إمكانية ارفاق
              التقارير
            </p>
          </div>
        </v-col>

        <v-col cols="12" md="4">
          <div
            class="text-box text-center d-flex justify-center align-center white pa-4 rounded-lg"
          >
            <p class="paragraph secondary--text font-weight-regular ma-0">
              توفير طرق دفع متعددة تناسب المستخدم
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "Services",
};
</script>

<style lang="scss" scoped>
.services {
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

  .text-box {
    height: 278px;
    box-shadow: 0px 0px 22px rgba(48, 122, 190, 0.1);

    &.center-box {
      height: 363px;
    }

    .paragraph {
      line-height: 2;
    }
  }
}
</style>
