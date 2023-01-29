<template>
  <section class="request-loading" v-if="requestLoading">
    <div id="css3-spinner-svg-pulse-wrapper">
      <svg
        id="css3-spinner-svg-pulse"
        version="1.2"
        height="210"
        width="550"
        xmlns="http://www.w3.org/2000/svg"
        viewport="0 0 60 60"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          id="css3-spinner-pulse"
          stroke="#008ad0"
          fill="none"
          stroke-width="2"
          stroke-linejoin="round"
          d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210"
        />
      </svg>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RequestLoading",

  computed: {
    // map loading state
    ...mapGetters({
      // loading state
      requestLoading: "loading/requestLoading",
    }),
  },
};
</script>

<style lang="scss" scoped>
.request-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  #css3-spinner-svg-pulse-wrapper {
    position: absolute;
    overflow: hidden;
    width: 260px;
    height: 210px;
    top: 50%;
    left: 50%;
    margin-top: -105px;
    margin-left: -130px;
    background-color: transparent;
    animation: none;
    -webkit-animation: none;
  }

  #css3-spinner-svg-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -105px;
    margin-left: -275px;
  }

  #css3-spinner-pulse {
    stroke-dasharray: 281;
    -webkit-animation: dash 5s infinite linear forwards;
  }

  /*Animation*/
  @-webkit-keyframes dash {
    from {
      stroke-dashoffset: 814;
    }

    to {
      stroke-dashoffset: -814;
    }
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 814;
    }

    to {
      stroke-dashoffset: -814;
    }
  }
}
</style>
