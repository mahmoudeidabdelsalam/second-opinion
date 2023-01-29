<template>
  <section class="loading d-flex justify-center align-center" v-if="show">
    <v-avatar tile size="220">
      <v-img :src="require('@/assets/images/logo.webp')" contain></v-img>
    </v-avatar>
  </section>
</template>

<script>
export default {
  name: "Loading",

  data: () => ({
    show: true,
  }),

  mounted() {
    this.toggleLoading();
  },

  methods: {
    // toggleLoading
    toggleLoading() {
      setTimeout(() => {
        this.show = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 99999;

  .v-avatar {
    .v-image__image {
      animation: imageAnimation 2s infinite;
    }
  }

  @keyframes imageAnimation {
    0% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.95);
    }
  }
}
</style>
