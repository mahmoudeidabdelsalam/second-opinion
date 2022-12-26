<template>
  <div>
    <div class="landinghome">
      <div class="container">
        <v-row>
          <v-col>
            <div class="headdoctor pa-5 rounded-lg d-flex flex-column flex-sm-row align-center">
              <img src="src/assets/images/Dr-woman.png" class="rounded-lg ms-sm-5" alt="TheDoctor"/>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingHome',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/landing.scss";
</style>