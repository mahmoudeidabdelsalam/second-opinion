<template>
  <div class="landingblog py-10">
    <div class="container">
      <h1 class="text-center">لصحة أفضل ..</h1>
      <v-row class="d-flex mt-10">
        <v-col cols="12" xs="12" md="6" v-for="post in posts" :key="post.id">
          <v-card class="d-flex flex-column flex-sm-row post">
            <img :src="post.img"/>
            <div class="postcontent d-flex flex-column justify-space-between pa-3">
              <span class="postdate mb-2">{{ post.date }}</span>
              <span>{{ post.title }}</span>
              <div class="icons pt-3 d-flex flex-wrap">
                <div class="ms-3 d-flex justify-center">
                  <span class="ms-1">{{ post.likes }}</span>
                  <v-icon>mdi-heart-outline</v-icon>
                </div>
                <div class="d-flex justify-center">
                  <span class="ms-1">{{ post.views }}</span>
                  <v-icon>mdi-eye-outline</v-icon>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-left">
        <v-btn class="blogContactBtns mt-5">إقرأ المزيد</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingBlog',
  data() {
    return {
      posts: [
      {
        id: 0,
        img: 'src/assets/images/blog/post1.jpg',
        date: 'الأثنين 05, سبتمبر 2022',
        title: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت  ',
        likes: '25',
        views: '86',
      },
      {
        id: 2,
        img: 'src/assets/images/blog/post2.jpg',
        date: 'الأثنين 05, سبتمبر 2022',
        title: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت ',
        likes: '25',
        views: '86',
      },
      {
        id: 3,
        img: 'src/assets/images/blog/post1.jpg',
        date: 'الأثنين 05, سبتمبر 2022',
        title: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت ',
        likes: '25',
        views: '86',
      },
      {
        id: 4,
        img: 'src/assets/images/blog/post2.jpg',
        date: 'الأثنين 05, سبتمبر 2022',
        title: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبا يسكينج أليايت ',
        likes: '25',
        views: '86',
      },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/landing.scss";
</style>