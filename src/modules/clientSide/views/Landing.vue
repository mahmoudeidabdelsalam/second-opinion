<template>
  <div>
    <ClientHeader/>
    <div class="landing">
      <LandingHome/>
      <LandingSearch/>
      <LandingDoctors/>
      <LandingApps/>
      <LandingBlog/>
      <LandingContact/>
    </div>
    <ClientFooter/>
  </div>
</template>

<script>
import ClientHeader from '../Components/Header.vue';
import ClientFooter from '../Components/Footer.vue';
import LandingHome from '../Components/LandingHome.vue';
import LandingSearch from '../Components/LandingSearch.vue';
import LandingDoctors from '../Components/LandingDoctors.vue';
import LandingApps from '../Components/LandingApps.vue';
import LandingBlog from '../Components/LandingBlog.vue';
import LandingContact from '../Components/LandingContact.vue';

export default {
  name: 'Landing',
  components: {
    ClientHeader,
    ClientFooter,
    LandingHome,
    LandingSearch,
    LandingDoctors,
    LandingApps,
    LandingBlog,
    LandingContact
},
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/landing.scss";
</style>