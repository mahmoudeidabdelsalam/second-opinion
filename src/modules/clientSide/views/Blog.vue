<template>
  <div>
    <ClientHeader/>
    <div class="blog py-10">
      <div class="container">
        <v-row>
          <v-col cols="12" md="6" lg="7" xl="8">
            <BlogPost/>
          </v-col>
          <v-col cols="12" md="6" lg="5" xl="4">
            <v-card v-for="post in posts" :key="post.id" class="d-flex flex-column flex-sm-row post mb-4">
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
        <v-row>
          <v-col cols="12" md="6">
            <BlogPost/>
          </v-col>
          <v-col cols="12" md="6">
            <BlogPost/>
          </v-col>
          <v-col>
            <BlogPost/>
          </v-col>
          <v-col>
            <BlogPost/>
          </v-col>
        </v-row>
      </div>
    </div>
    <ClientFooter/>
  </div>
</template>

<script>
import ClientHeader from '../Components/Header.vue';
import ClientFooter from '../Components/Footer.vue';
import BlogPost from '../Components/BlogPost.vue';

export default {
  name: 'Blog',
  components: { ClientHeader, ClientFooter, BlogPost },
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
@import "../style/blog.scss";
</style>