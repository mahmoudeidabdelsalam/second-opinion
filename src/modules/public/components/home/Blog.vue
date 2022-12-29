<template>
  <section class="blog mb-16">
    <v-container fluid>
      <h1 class="primary--text text-center mb-10">
        Better information .. For better health
      </h1>

      <div class="articles mx-auto" style="max-width: 1200px">
        <v-row>
          <v-col cols="12" md="6" v-for="article in 4" :key="article">
            <div
              class="article rounded-lg d-flex justify-start align-start pa-0 elevation-2"
            >
              <v-avatar class="rounded-lg" size="150">
                <v-img
                  cover
                  lazy-src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                  max-height="150"
                  max-width="150"
                  src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                  alt="article"
                ></v-img>
              </v-avatar>
              <div class="article-info pa-3">
                <span class="d-block mb-2 primary--text">
                  Monday 05, September 2022
                </span>
                <span
                  class="d-block mb-2 font-weight-bold body-2 secondary--text"
                >
                  Lorem Ipsum Dollar Set Amit ,Detector Adaiba Skinging Elite
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Blog",
};
</script>

<style lang="scss" scoped></style>
