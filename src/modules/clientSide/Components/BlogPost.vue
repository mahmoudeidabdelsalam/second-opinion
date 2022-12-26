<template>
  <div>
    <div class="blogpost">
      <img src="src/assets/images/blog/Rectangle.png" style="width:100%;max-width:100%"/>
      <div class="d-flex flex-wrap mt-3">
        <div class="ms-3">
          <v-icon class="ms-1">mdi-calendar-range</v-icon>
          <span class="ms-1">الأثنين 05, سبتمبر 2022</span>
        </div>
        <div class="postinfo d-flex flex-wrap">
          <div class="ms-3 d-flex justify-center">
            <v-icon class="ms-1">mdi-heart-outline</v-icon>
            <span>26</span>
          </div>
          <div class="d-flex justify-center">
            <v-icon class="ms-1">mdi-eye-outline</v-icon>
            <span>105</span>
          </div>
        </div>
      </div>
      <h2 class="mt-3"><router-link to="/article">نضع راحة مرضانا في الأولوية</router-link></h2>
      <p class="mt-2">لوريم ايبسوم دولار سيت أميت ,كونسيك تيتور أدايبا يسكينج أليايت ,سيت دو أيوسمود تيمبور أنكايديد يونتيوت لابوري ات دولار ماجنا أليكيوا. يوت انيم أد مينيم فينايم ,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسي كيوات </p>
      <div class="text-left">
        <v-btn class="blogContactBtns">إقرأ المزيد</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BlogPost',
}
</script>

<style lang="scss" scoped>
@import "../style/blog.scss";
</style>