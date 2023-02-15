<template>
  <v-footer class="footer">
    <v-container style="max-width: 1400px">
      <v-row>
        <!-- <v-col cols="12" xl="3" lg="4" md="6">
          <div class="main-column column">
            <router-link
              :to="{ name: 'Home' }"
              class="logo d-block mb-4"
              style="height: 100px"
            >
              <img
                src="../../../assets/images/logo.webp"
                alt="Top Doctors logo"
              />
            </router-link>
            <span class="commercial-number primary--text d-block mb-4">
              رقم السجل التجاري: 1010829627
            </span>
            <div class="payment-methods mb-8">
              <img src="@/assets/images/mada.svg" alt="Mada" />
              <img src="@/assets/images/stc.svg" alt="Stc" />
              <img src="@/assets/images/visa.svg" alt="Visa" />
              <img src="@/assets/images/mastercard.svg" alt="Mastercard" />
            </div>
          </div>
        </v-col> -->

        <v-col cols="12" xl="3" lg="2" md="6" sm="6">
          <div class="regular-column column">
            <span class="column-title d-block primary--text mb-6">
              روابط مساعدة
            </span>
            <router-link
              :to="{ name: 'PublicAbout' }"
              class="link d-block mb-6"
            >
              من نحن؟
            </router-link>
            <router-link
              :to="{ name: 'PublicDoctors' }"
              class="link d-block mb-6"
            >
              الاطباء
            </router-link>
            <router-link
              :to="{ name: 'PublicTermsAndConditions' }"
              class="link d-block mb-6"
            >
              الشروط والأحكام
            </router-link>
          </div>
        </v-col>

        <v-col cols="12" xl="2" lg="2" md="6" sm="6">
          <div class="regular-column column">
            <span class="column-title d-block primary--text mb-6">
              انضم الينا
            </span>
            <router-link :to="{ name: 'Login' }" class="link d-block mb-6">
              تسجيل الدخول
            </router-link>
            <router-link :to="{ name: 'Register' }" class="link d-block mb-6">
              التسجيل
            </router-link>
          </div>
        </v-col>

        <v-col cols="12" xl="4" lg="3" md="6">
          <div class="regular-column column">
            <span class="column-title d-block primary--text mb-6">
              تواصل معنا
            </span>
            <a
              href="mailto:info@second-opinion.com"
              class="contact-link d-flex align-center mb-4"
            >
              <v-icon class="mx-2">mdi-email-outline</v-icon>
              info@secondopinion.sa
            </a>
            <a
              href="tel:+920066019"
              class="contact-link d-flex align-center mb-4"
            >
              <v-icon class="mx-2">mdi-phone</v-icon>
              920066019
            </a>
            <span class="company-address d-flex align-center mb-4">
              <v-icon class="mx-2">mdi-map-marker</v-icon>
              7064، سالم بن معقل، حي النخيل، 4092
            </span>
            <!-- <div class="social-links mb-5">
              <a href="#" target="_blank" class="box" aria-label="twitter">
                <v-icon color="white">mdi-twitter</v-icon>
              </a>
              <a href="#" target="_blank" class="box" aria-label="whatsapp">
                <v-icon color="white">mdi-whatsapp</v-icon>
              </a>
              <a href="#" target="_blank" class="box" aria-label="instagram">
                <v-icon color="white">mdi-instagram</v-icon>
              </a>
            </div> -->
          </div>
        </v-col>

        <v-col cols="12" xl="3" lg="3" md="6">
          <div
            class="regular-column column d-flex flex-column flex-md-row justify-start align-center"
          >
            <div class="stores d-flex flex-column ml-8">
              <v-btn
                class="white rounded-lg py-6 mb-4 d-flex justify-start align-center"
                style="border: 1px solid #000 !important"
              >
                <div class="text d-flex flex-column align-end px-2">
                  <span
                    class="font-weight-regular text-capitalize"
                    style="margin-bottom: -7px"
                  >
                    Get it on
                  </span>
                  <span class="text-capitalize font-weight-bold subtitle-1">
                    App Store
                  </span>
                </div>
                <v-avatar size="28">
                  <v-img
                    :src="require('@/assets/images/apple.webp')"
                    :lazy-src="require('@/assets/images/apple.webp')"
                    contain
                  ></v-img>
                </v-avatar>
              </v-btn>

              <v-btn
                class="white rounded-lg py-6 d-flex justify-start align-center"
                style="border: 1px solid #000 !important"
              >
                <div class="text d-flex flex-column align-end px-2">
                  <span
                    class="font-weight-regular text-uppercase"
                    style="margin-bottom: -7px"
                  >
                    Get it on
                  </span>
                  <span class="text-capitalize font-weight-bold subtitle-1">
                    Google Play
                  </span>
                </div>
                <v-avatar size="25">
                  <v-img
                    :src="require('@/assets/images/google-play.webp')"
                    :lazy-src="require('@/assets/images/google-play.webp')"
                    contain
                  ></v-img>
                </v-avatar>
              </v-btn>
            </div>
            <v-avatar tile class="mb-5" size="200">
              <v-img
                :src="require('@/assets/images/logo.webp')"
                :lazy-src="require('@/assets/images/logo.webp')"
                contain
              ></v-img>
            </v-avatar>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="copy-right primary text-center pa-5 mt-2">
      <span class="white--text font-weight-regular body-2">
        جميع الحقوق محفوظة لشركة <strong>Second Opinion</strong> &#169; 2023
      </span>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "PublicFooter",
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 50px 0 0;
  background-color: var(--white-color);
  box-shadow: 0px 0px 110px rgba(0, 0, 0, 0.04) !important;

  .main-column {
    .logo {
      img {
        width: 120px;
        height: auto;
        object-fit: cover;
      }
    }

    .brand {
      font-size: 2rem;
      font-weight: 800;
    }

    .commercial-number {
      font-size: 1rem;
      font-weight: 600;
    }

    .payment-methods {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 10px;
    }
  }

  .regular-column {
    .column-title {
      font-size: 1.125rem;
      font-weight: 800;
    }

    .link {
      font-size: 1.125rem;
      font-weight: 400;
      color: var(--dark-color);
      &:hover {
        transform: translateX(-5px);
        color: var(--main-color);
      }
    }

    .contact-link {
      font-size: 1rem;
      font-weight: 400;
      color: var(--dark-color);
      &:hover {
        transform: translateX(-5px);
        color: var(--main-color);
      }
    }

    .social-links {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 20px;

      .box {
        border: 1px solid var(--main-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          box-shadow: 0 0 0px 2px var(--main-color);
        }

        .v-icon {
          font-size: 1.5rem;
          color: var(--main-color) !important;
        }
      }
    }
  }

  .copy-right {
    width: 100%;
  }
}
</style>
