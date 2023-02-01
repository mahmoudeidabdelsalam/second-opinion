<template>
  <section class="blog mb-16">
    <v-container style="max-width: 1400px">
      <h1 class="primary--text text-center mb-10 text-h4 font-weight-bold">
        معلومات أفضل .. لصحة أفضل
      </h1>

      <div class="articles mx-auto" v-if="articles.length">
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
                <span
                  class="d-block mb-2 primary--text font-weight-regular text-subtitle-1"
                >
                  {{ article.time }}
                </span>
                <span class="d-block mb-4 font-weight-regular secondary--text">
                  {{ article.title }}
                </span>
                <div class="article-details d-flex justify-start align-center">
                  <div class="box">
                    <span
                      class="mx-1 font-weight-regular text-subtitle-2 black--text"
                    >
                      65
                    </span>
                    <v-icon size="20" color="pink">mdi-heart-outline</v-icon>
                  </div>
                  <div class="box mx-4">
                    <span
                      class="mx-1 font-weight-regular text-subtitle-2 black--text"
                    >
                      86
                    </span>
                    <v-icon size="20" color="primary">mdi-eye-outline</v-icon>
                  </div>
                </div>
              </div>
            </a>
          </v-col>
        </v-row>
      </div>

      <!-- waiting for data -->
      <v-skeleton-loader v-else max-width="300" type="card"></v-skeleton-loader>
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
      handleResponse: "responseHandler/handleResponse",
    }),

    // init data
    initData() {
      // get articles
      this.axios
        .get(
          `https://blog.secondopinion.sa/wp-json/wp/api/posts?page=1&per_page=4`
        )
        .then((response) => {
          this.articles = response.data.data;
        })
        .catch((error) => {
          this.handleResponse(error.response);
        });
    },
  },
};
</script>
