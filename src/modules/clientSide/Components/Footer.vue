<template>
  <footer>
    <div class="container">
      <v-row>
        <v-col cols="6" sm="" class="centercol">
          <div>
            <ul>
              <li class="mb-3"><router-link :to="{name: 'Home'}">من نحن؟</router-link></li>
              <li class="mb-3"><router-link :to="{name: 'AllDoctors'}">الأطباء</router-link></li>
              <li class="mb-3"><router-link :to="{name: 'Home'}">سياسة الخصوصية</router-link></li>
              <li class="mb-3"><router-link :to="{name: 'Home'}">شروط الإستخدام</router-link></li>
            </ul>
          </div>
        </v-col>
        <v-col cols="6" sm="" class="centercol">
          <div>
            <ul>
              <li class="mb-3"><router-link :to="{name: 'Home'}">انضم إلينا</router-link></li>
              <li class="showinmobile"><router-link :to="{name: 'Home'}">اتصل بنا</router-link></li>
            </ul>
          </div>
        </v-col>
        <v-col class="hideinmobile">
          <div>
            <ul>
              <li><router-link :to="{name: 'Home'}">اتصل بنا</router-link></li>
            </ul>
          </div>
        </v-col>
        <v-col>
          <div class="appicons">
            <div class="d-flex rounded-lg mb-2 py-1 px-3">
              <div class="py-2 iconholder d-flex justify-center align-center">
                <img src="src/assets/images/Apple_logo_black.png"/>
              </div>
              <div class="d-flex flex-column ms-2">
                <span>Download on the</span>
                <span class="font-weight-bold">App Store</span>
              </div>
            </div>
            <div class="d-flex rounded-lg mb-2 py-1 px-3">
              <div class="py-2 iconholder d-flex justify-center align-center">
                <img src="src/assets/images/Google_Play_Arrow.png"/>
              </div>
              <div class="d-flex flex-column ms-2">
                <span>GET IT ON</span>
                <span class="font-weight-bold">Google Play</span>
              </div>
            </div>
            <div class="d-flex rounded-lg py-1 px-3">
              <div class="py-2 iconholder d-flex justify-center align-center">
                <img src="src/assets/images/appgallery.png"/>
              </div>
              <div class="d-flex flex-column ms-2">
                <span>EXPLORE IT ON</span>
                <span class="font-weight-bold">App Gallery</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col>
          <div class="footerlogo text-sm-end">
            <img src="src/assets/images/landinglogo.png" alt="TopDoctors"/>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="copyright">
      <p class="ma-0">حقوق النشر 2022 توب دكتورز</p>
    </div>
  </footer>
</template>

<script>

</script>

<style lang="scss" scoped>
@import "../style/footer.scss";
</style>