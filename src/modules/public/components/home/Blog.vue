<template>
  <section class="blog mb-16">
    <v-container style="max-width: 1400px">
      <h1 class="primary--text text-center mb-10">معلومات أفضل .. لصحة أفضل</h1>

      <div class="articles mx-auto">
        <v-row>
          <v-col cols="12" md="6" v-for="article in articles" :key="article.id">
            <a
              :href="article.link"
              class="article rounded-lg d-flex justify-start align-start pa-0 elevation-2 white"
            >
              <v-avatar class="rounded-lg" size="150">
                <v-img
                  :src="article.image"
                  :lazy-src="article.image"
                  cover
                  max-height="150"
                  max-width="150"
                  alt="article"
                ></v-img>
              </v-avatar>
              <div class="article-info pa-3">
                <span class="d-block mb-2 primary--text">
                  {{ article.time }}
                </span>
                <span
                  class="d-block mb-2 font-weight-bold body-2 secondary--text"
                >
                  {{ article.title }}
                </span>
              </div>
            </a>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Blog",

  data: () => ({
    // articles
    articles: [],
  }),

  created() {
    // init data
    this.initData();
  },

  methods: {
    ...mapActions({
      getData: "crudOperations/getData",
    }),

    // init data
    initData() {
      // get articles
      this.getData(
        `https://blog.secondopinion.sa/wp-json/wp/api/posts?page=1&per_page=4`
      ).then((res) => {
        this.articles = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
