<template>
  <main class="appointments pa-5">
    <span class="d-block font-weight-bold mb-5 primary--text text-h5">
      الحجوزات
    </span>

    <div class="content pa-5 elevation-3 rounded-lg">
      <div class="upcoming mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد القادمة
        </span>

        <v-row>
          <v-col cols="12" md="6" v-for="appointment in 2" :key="appointment">
            <div class="appointment rounded-lg overflow-hidden">
              <div
                class="head primary_dark d-flex justify-start align-center py-3"
              >
                <v-icon class="mx-2" color="white">mdi-calendar</v-icon>
                <span class="white--text">
                  الاثنين الموافق 13/ 10 - الساعة: 01:30 مساءًا
                </span>
              </div>
              <div class="body primary py-5 px-3">
                <div class="doctor d-flex justify-start align-center">
                  <v-avatar class="mx-2 rounded-lg" size="90">
                    <v-img
                      cover
                      lazy-src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                      max-height="90"
                      max-width="90"
                      src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                      alt="doctor"
                    ></v-img>
                  </v-avatar>
                  <div class="doctor-info px-2">
                    <span class="d-block mb-2 font-weight-bold white--text">
                      الطبيب / محمد عبدالله
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      استشاري جلدية وتجميل
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="expired mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد المنتهية
        </span>

        <v-row>
          <v-col cols="12" md="6" v-for="appointment in 2" :key="appointment">
            <div class="appointment rounded-lg overflow-hidden">
              <div
                class="head grey_dark d-flex justify-start align-center py-3"
              >
                <v-icon class="mx-2" color="white">mdi-calendar</v-icon>
                <span class="white--text">
                  الاثنين الموافق 13/ 10 - الساعة: 01:30 مساءًا
                </span>
              </div>
              <div class="body grey py-5 px-3">
                <div class="doctor d-flex justify-start align-center">
                  <v-avatar class="mx-2 rounded-lg" size="90">
                    <v-img
                      cover
                      lazy-src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                      max-height="90"
                      max-width="90"
                      src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                      alt="doctor"
                    ></v-img>
                  </v-avatar>
                  <div class="doctor-info px-2">
                    <span class="d-block mb-2 font-weight-bold white--text">
                      الطبيب / محمد عبدالله
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      استشاري جلدية وتجميل
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="cancelled mb-5">
        <span class="d-block font-weight-bold mb-5 primary--text text-h6">
          المواعيد الملغية
        </span>

        <v-row>
          <v-col cols="12" md="6" v-for="appointment in 2" :key="appointment">
            <div class="appointment rounded-lg overflow-hidden">
              <div class="head red_dark d-flex justify-start align-center py-3">
                <v-icon class="mx-2" color="white">mdi-calendar</v-icon>
                <span class="white--text">
                  الاثنين الموافق 13/ 10 - الساعة: 01:30 مساءًا
                </span>
              </div>
              <div class="body red py-5 px-3">
                <div class="doctor d-flex justify-start align-center">
                  <v-avatar class="mx-2 rounded-lg" size="90">
                    <v-img
                      cover
                      lazy-src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                      max-height="90"
                      max-width="90"
                      src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
                      alt="doctor"
                    ></v-img>
                  </v-avatar>
                  <div class="doctor-info px-2">
                    <span class="d-block mb-2 font-weight-bold white--text">
                      الطبيب / محمد عبدالله
                    </span>
                    <span
                      class="d-block mb-2 font-weight-regular body-2 white--text"
                    >
                      استشاري جلدية وتجميل
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Appointments",
};
</script>
