<template>
  <div>
    <ClientHeader/>
    <div class="doctors pb-10">
      <v-row class="pa-0 headdoctors">
        <div class="container">
          <p class="py-5 px-4 px-md-0">احجز مع أفضل الأطباء في المملكة</p>
        </div>
      </v-row>
      <div class="container">
        <v-row>
          <v-col>
            <div v-for="box in boxs" :key="box.id" class="doctorbox mt-5 pa-5 rounded-lg d-flex flex-column flex-sm-row align-center align-sm-stretch">
              <img :src="box.doctorImg" class="rounded-lg ms-sm-5 mb-2 mb-sm-0" alt="TheDoctor"/>
              <div class="content text-center text-sm-start d-flex flex-column">
                <router-Link class="font-weight-medium rounded-xl" link :to="{name: 'TheDoctor'}">
                  <span>{{ box.gender === 'male'? 'الطبيب':'الطبيبة' }}/ </span>
                  <span>{{ box.doctorName }}</span>
                </router-Link>
                <h4 class="font-weight-medium justify-self-end">
                  <span>التخصص/ </span>
                  <span>{{ box.specialist }}</span>
                </h4>
                <div class="d-flex justify-space-between align-center flex-column flex-sm-row mt-auto">
                  <span class="flex-grow-1">{{ box.description }}</span>
                  <v-btn class="pa-5 rounded-xl d-flex align-center me-sm-2 mt-3 mt-sm-0">طلب استشارة</v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="3"
            prev-icon="mdi-menu-right"
            next-icon="mdi-menu-left"
            class="mt-10"
          ></v-pagination>
        </div>
      </div>
    </div>
    <ClientFooter/>
  </div>
</template>

<script>
export default {
  name: 'TheDoctor',
  components: {
    ClientHeader: () =>
      import("../Components/Header.vue"),
    ClientFooter: () =>
      import("../Components/Footer.vue"),
  },
  data() {
    return {
      page: 1,
      boxs: [
        {
          id: 0,
          doctorImg: 'src/assets/images/Dr-woman.png',
          gender: 'female',
          doctorName: 'هند محمد القرشي',
          specialist: 'الباطنة',
          description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
        },
        {
          id: 2,
          gender: 'male',
          doctorImg: 'src/assets/images/Doctors/dr-khaled.png',
          doctorName: 'خالد ابراهيم',
          specialist: 'الباطنة',
          description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
        },
        {
          id: 3,
          gender: 'female',
          doctorImg: 'src/assets/images/Doctors/dr-mariam.png',
          doctorName: 'مريم عبدالله',
          specialist: 'الباطنة',
          description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
        },
        {
          id: 4,
          gender: 'male',
          doctorImg: 'src/assets/images/Doctors/dr-yasser.png',
          doctorName: 'ياسر محمود',
          specialist: 'الباطنة',
          description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
        },
        {
          id: 5,
          doctorImg: 'src/assets/images/Dr-woman.png',
          gender: 'female',
          doctorName: 'هند محمد القرشي',
          specialist: 'الباطنة',
          description: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت, سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا',
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/doctors.scss";
</style>