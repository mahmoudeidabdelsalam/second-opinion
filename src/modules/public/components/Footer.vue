<template>
  <v-footer class="footer">
    <v-container style="max-width: 1400px">
      <v-row>
        <v-col cols="12" lg="4" md="6">
          <div class="main-column column">
            <span class="brand d-block primary--text mb-8">Second Opinion</span>
            <span class="commercial-number primary--text d-block mb-4">
              Commercial Registration Number: 1010234567
            </span>
            <div class="payment-methods mb-8">
              <img src="@/assets/images/mada.svg" alt="Mada" />
              <img src="@/assets/images/stc.svg" alt="Stc" />
              <img src="@/assets/images/visa.svg" alt="Visa" />
              <img src="@/assets/images/mastercard.svg" alt="Mastercard" />
            </div>
          </div>
        </v-col>

        <v-col cols="6" lg="3" md="6" sm="6">
          <div class="regular-column column">
            <span class="column-title d-block primary--text mb-6">
              Helpful Links
            </span>
            <router-link
              :to="{ name: 'PublicTermsAndConditions' }"
              class="link d-block mb-6"
            >
              Terms & Conditions
            </router-link>
            <router-link :to="{ name: 'Login' }" class="link d-block mb-6">
              Login
            </router-link>
            <router-link :to="{ name: 'Register' }" class="link d-block mb-6">
              Register
            </router-link>
            <router-link :to="{ name: 'ContactUs' }" class="link d-block">
              Contact Us
            </router-link>
          </div>
        </v-col>

        <v-col cols="12" lg="4" md="6">
          <div class="regular-column column">
            <span class="column-title d-block primary--text mb-6">
              Contact Us
            </span>
            <a
              href="mailto:info@second-opinion.com"
              class="contact-link d-flex align-center mb-4"
            >
              <v-icon class="mx-2">mdi-email-outline</v-icon>
              info@second-opinion.com
            </a>
            <a
              href="tel:+966595620000"
              class="contact-link d-flex align-center mb-4"
            >
              <v-icon class="mx-2">mdi-phone</v-icon>
              966595620000
            </a>
            <span class="company-address d-flex align-center mb-4">
              <v-icon class="mx-2">mdi-map-marker</v-icon>
              3004, Imam Saud Bin Faisal Road, Al Sahafa District, 6130
            </span>
            <div class="social-links mb-5">
              <a href="#" target="_blank" class="box">
                <v-icon color="white">mdi-twitter</v-icon>
              </a>
              <a href="#" target="_blank" class="box">
                <v-icon color="white">mdi-whatsapp</v-icon>
              </a>
              <a href="#" target="_blank" class="box">
                <v-icon color="white">mdi-instagram</v-icon>
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="copy-right primary text-center pa-5 mt-2">
      <span class="white--text font-weight-regular body-2">
        All rights reserved to <strong>Second Opinion</strong> &#169; 2023
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
