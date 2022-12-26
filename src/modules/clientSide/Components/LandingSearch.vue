<template>
  <div>
    <div class="landingsearch py-10">
      <div class="container">
        <v-tabs v-model="tab" background-color="#f2f7fd">
          <v-tab v-for="item in items" :key="item.tab" class="tab rounded-lg rounded-br-0 px-sm-10">
            <span class="font-weight-bold">{{ item.tab }}</span>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="tabsbody rounded-lg rounded-tr-0">
          <v-tab-item v-for="item in items" :key="item.tab">
            <v-card flat>
              <v-card-text class="d-flex xscolumn">
                <input
                  :rules="rules"
                  class="maininput py-2 px-3 rounded-lg"
                  :placeholder="item.placeholder"
                />
                <v-btn class="searchbtn px-10 mx-sm-3 py-3">بحث</v-btn>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <div class="btnsbox mt-5">
          <v-row>
            <v-col cols="12" class="d-flex justify-center pb-0 pt-0 flex-wrap">
              <v-btn v-for="btn in btns1" :key="btn" class="manybtns px-5 mx-1 my-1 py-3 xswidth">{{ btn }}</v-btn>
            </v-col>
            <v-col cols="12" class="d-flex justify-center pt-0 flex-wrap">
              <v-btn v-for="btn in btns2" :key="btn" class="manybtns px-5 mx-1 my-1 py-3 xswidth">{{ btn }}</v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingSearch',
  data() {
    return {
      tab: null,
      items: [
        { tab: 'الطبيب', placeholder: "بحث بالطبيب"},
        { tab: 'التخصص', placeholder: "بحث بالتخصص"}
      ],
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      btns1: ['أوعية دموية','جراحة عظام','كشف عيون','باطنية','مخ وأعصاب'],
      btns2: ['أوعية دموية','جراحة عظام','باطنية','مخ وأعصاب']
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/landing.scss";
</style>