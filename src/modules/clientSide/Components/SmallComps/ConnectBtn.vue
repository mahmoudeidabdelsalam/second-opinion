<template>
  <div class="ConnectBtn">
    <div class="pa-2 rounded-lg mb-2 d-flex align-center xscolumn">
      <div class="pa-1 rounded-lg ms-1 ms-sm-2">
        <v-icon class="mdi-icon"> {{ icon }}</v-icon>
      </div>
      <span :style="style">{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectBtn',
  props: ['icon','title','size'],
  computed: {
      style() {
        return 'font-size: ' + (this.size && (this.size === "sm" ? '0.8rem': '1rem'));
      },
    },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/style/variables";

  .ConnectBtn {
    > div {
      background-color: $secondary_primary_color;
      color: white;
      cursor: pointer;
      span {
        font-size: 1rem;
      }
      > div {
        background-color: white;
        .mdi-icon {
          color: $secondary_primary_color;
        }
      }
      @media (max-width: 275px){
        &.xscolumn {
          flex-direction: column;
          text-align: center
        }
      }
    }
  }
</style>