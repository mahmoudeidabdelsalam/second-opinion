<template>
  <div>
    <ClientHeader/>
    <div class="thedoctor py-10">
      <div class="container">
        <v-row>
          <v-col>
            <div class="headdoctor pa-5 rounded-lg d-flex flex-column flex-sm-row align-center">
              <img src="src/assets/images/Dr-woman.png" class="rounded-lg ms-sm-5" alt="TheDoctor"/>
              <div class="content text-center text-sm-start">
                <h2 class="font-weight-medium">استشاري جلدية وتجميل</h2>
                <h2>د/ ندي أحمد</h2>
                <v-btn class="ms-1" >جلدية أطفال</v-btn>
                <v-btn class="ms-1" >جلدية بالغين</v-btn>
                <v-btn class="ms-1" >تجميل بالليزر</v-btn>
                <v-spacer class="d-none d-md-block"></v-spacer>
                <v-btn class="ms-1" >تجميل بالليزر</v-btn>
                <v-btn class="ms-1" >تجميل بالليزر</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="7" md="8" class="order-2 order-sm-0">
            <div class="aboutdoctor pa-5 rounded-lg">
              <div class="d-flex mb-3 align-center">
                <v-icon class="rounded-sm ms-2">mdi-information-variant</v-icon>
                <h3>عن الطبيب</h3>
              </div>
              <p>تتمتع بخبرة واسعة لمدة 24 عامًا من العمل في مستشفيات الرعاية الثالثة ، وكانت عضو هيئة تدريس كمدرس جامعي ودراسات عليا في كليات طبية شهيرة في المملكة العربية السعودية على مدار الـ 24 عامًا الماضية ، وتخصصت في تقنيات المساعدة على الإنجاب والتلقيح
              </p>
            </div>
          </v-col>
          <v-col>
            <div class="connectdoctor py-3">
              <h3 class="mb-3">احجز موعدك</h3>
              <ConnectBtn icon="mdi-video" title="حجز استشارة صوتية/مرئية" size="lg"/>
              <ConnectBtn icon="mdi-file-document-plus-outline" title="طلب استشارة مكتوبة" size="lg"/>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="8">
            <div class="certificates pa-5 rounded-lg">
              <div class="d-flex mb-3 align-center">
                <v-icon class="rounded-sm ms-2">mdi-certificate-outline</v-icon>
                <h3>الشهادات</h3>
              </div>
              <ul>
                <li>شهادة رقم 1</li>
                <li>شهادة رقم 2</li>
                <li>شهادة رقم 3</li>
              </ul>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="8">
            <div class="prices pa-5 rounded-lg">
              <div class="d-flex mb-3 align-center">
                <v-icon class="rounded-circle ms-2">mdi-currency-usd</v-icon>
                <h3>الأسعار</h3>
              </div>
              <div class="mb-1">
                <span class="ms-2">الإستشارة:</span>
                <span>300 رياب سعودي</span>
              </div>
              <div class="mb-1">
                <span class="ms-2">التقرير الطبي:</span>
                <span>100 رياب سعودي</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <ClientFooter/>
  </div>
</template>

<script>
import ConnectBtn from '../Components/SmallComps/ConnectBtn.vue';

export default {
  name: 'TheDoctor',
  components: {
    ClientHeader: () => import("../components/Header.vue"),
    ClientFooter: () => import("../components/Footer.vue"),
    ConnectBtn
},
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/thedoctor.scss";
</style>