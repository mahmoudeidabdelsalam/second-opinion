<template>
  <div class="landingdoctors py-10">
    <div class="container">
      <h1 class="text-center">الأطباء</h1>
      <split-carousel :height="520" :item-width="210">
        <split-carousel-item v-for="doctor in doctors" :key="doctor.id">
          <v-card class="mx-2 mt-10 pa-2 rounded-lg text-center" style="margin-right:0px">
            <v-img :src="doctor.img" class="rounded-lg" height="200px"></v-img>
            <div class="pt-3 dr-content d-flex flex-column">
              <span>{{ doctor.name }}</span>
              <span class="mb-2">{{ doctor.specialist }}</span>
              <ConnectBtn icon="mdi-video" title="استشارة صوتية/مرئية" size="sm"/>
              <ConnectBtn icon="mdi-file-document-plus-outline" title="طلب تقرير طبي" size="sm"/>
              <ConnectBtn icon="mdi-file-account-outline" title="مشاهدة صفحة الطبيب" size="sm"/>
            </div>
          </v-card> 
        </split-carousel-item>
      </split-carousel>
    </div>
  </div>
</template>

<script>
import ConnectBtn from './SmallComps/ConnectBtn.vue';
import { SplitCarousel, SplitCarouselItem } from "vue-split-carousel";

export default {
  name: "LandingDoctors",
  props: ['direction'],
  data() {
    return {
      doctors: [
      {
        id: 0,
        img: 'src/assets/images/Dr-woman.png',
        name: 'هند محمد القرشي',
        gender: 'female',
        specialist: 'الباطنة',
        description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
      },
      {
        id: 1,
        img: 'src/assets/images/Doctors/dr-khaled.png',
        name: 'خالد ابراهيم',
        gender: 'male',
        specialist: 'الباطنة',
        description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
      },
      {
        id: 2,
        img: 'src/assets/images/Doctors/dr-mariam.png',
        name: 'مريم عبدالله',
        gender: 'female',
        specialist: 'الباطنة',
        description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
      },
      {
        id: 3,
        img: 'src/assets/images/Doctors/dr-yasser.png',
        name: 'ياسر محمود',
        gender: 'male',
        specialist: 'الباطنة',
        description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
      },
      {
        id: 4,
        img: 'src/assets/images/Dr-woman.png',
        name: 'هند محمد القرشي',
        gender: 'female',
        specialist: 'الباطنة',
        description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
      },
      {
        id: 5,
        img: 'src/assets/images/Dr-woman.png',
        name: 'هند محمد القرشي',
        gender: 'female',
        specialist: 'الباطنة',
        description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
      },
      {
        id: 6,
        img: 'src/assets/images/Dr-woman.png',
        name: 'هند محمد القرشي',
        gender: 'female',
        specialist: 'الباطنة',
        description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
      },
      {
        id: 7,
        img: 'src/assets/images/Doctors/dr-mariam.png',
        name: 'هند محمد القرشي',
        gender: 'female',
        specialist: 'الباطنة',
        description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
      }
      ]
    };
  },
  components: { ConnectBtn, SplitCarousel, SplitCarouselItem },
}
</script>

<style lang="scss" scoped>
  @import "../style/landing.scss";
</style>