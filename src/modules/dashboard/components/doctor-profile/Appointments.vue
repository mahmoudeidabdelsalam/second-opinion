<template>
  <v-card flat>
    <span class="d-block black--text text-h6 font-weight-bold mb-5">
      مواعيد العمل
    </span>

    <v-form
      ref="form"
      :v-model="valid"
      v-if="!waitingForData"
      style="max-width: 600px"
    >
      <v-container>
        <v-row v-for="(day, index) in days" :key="index">
          <v-col cols="12">
            <span class="d-block mb-3 font-weight-bold secondary--text">
              {{ day.day }}
            </span>

            <div class="appointment-box pa-5 rounded-lg primary_bg">
              <v-row>
                <div
                  class="d-flex justify-space-between align-center"
                  style="width: 100%"
                >
                  <span class="font-weight-medium secondary--text">الحالة</span>
                  <v-switch
                    v-model="form[index].status"
                    color="primary"
                    inset
                    @change="updateDayStatus(day.id, index, $event)"
                  ></v-switch>
                </div>
                <v-col cols="12" md="6" v-if="form[index].status == true">
                  <!-- date picker -->
                  <v-text-field
                    label="من الساعة"
                    v-model="form[index].start_time"
                    type="time"
                    outlined
                    hide-details="true"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" v-if="form[index].status == true">
                  <!-- date picker -->
                  <v-text-field
                    label="حتى الساعة"
                    v-model="form[index].end_time"
                    type="time"
                    outlined
                    hide-details="true"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" v-if="form[index].status == true">
                  <v-btn
                    color="primary"
                    class="white--text"
                    @click="updateDayStatus(day.id, index)"
                  >
                    حفظ
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- waiting for data -->
    <v-skeleton-loader
      v-if="waitingForData"
      max-width="300"
      type="card"
    ></v-skeleton-loader>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Appointments",

  data: () => ({
    // waiting for data
    waitingForData: false,

    // days
    days: [],

    // form data dynamic
    form: [
      {
        start_time: "",
        end_time: "",
        status: false,
      },
      {
        start_time: "",
        end_time: "",
        status: false,
      },
      {
        start_time: "",
        end_time: "",
        status: false,
      },
      {
        start_time: "",
        end_time: "",
        status: false,
      },
      {
        start_time: "",
        end_time: "",
        status: false,
      },
      {
        start_time: "",
        end_time: "",
        status: false,
      },
      {
        start_time: "",
        end_time: "",
        status: false,
      },
    ],
  }),

  computed: {
    ...mapGetters({
      valid: "validationRules/valid",
      numberRules: "validationRules/numberRules",
    }),
  },

  created() {
    // init data
    this.initData();
  },

  methods: {
    ...mapActions({
      handleResponse: "responseHandler/handleResponse",
      showRequsetLoading: "loading/showRequestLoading",
      hideRequsetLoading: "loading/hideRequestLoading",
    }),

    initData() {
      // set waiting for data
      this.waitingForData = true;

      // get doctor time management
      this.axios
        .get(`dashboard/doctors/${this.$route.params.id}/time-management`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          // set data
          this.days = response.data.data;

          // set form data to every day
          this.days.forEach((day, index) => {
            this.form[index].start_time = day.start_time;
            this.form[index].end_time = day.end_time;
            this.form[index].status = day.status;
          });

          // hide waiting for data
          this.waitingForData = false;
        })
        .catch((error) => {
          this.handleResponse(error.response);

          // hide waiting for data
          this.waitingForData = false;
        });
    },

    // update day status
    updateDayStatus(id, index, event) {
      if (event == false) {
        let data = new URLSearchParams();
        data.append("schedule_time_id", id);
        data.append("status", 0);

        // show request loading
        this.showRequsetLoading();

        this.axios
          .put(
            `dashboard/doctors/${this.$route.params.id}/time-management`,
            data,
            {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            }
          )
          .then((response) => {
            this.handleResponse(response);

            // hide request loading
            this.hideRequsetLoading();
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide request loading
            this.hideRequsetLoading();
          });
      } else {
        let data = new URLSearchParams();
        data.append("schedule_time_id", id);
        // start time to H:1 format
        data.append(
          "start_time",
          this.form[index].start_time.split(":")[0] +
            ":" +
            this.form[index].start_time.split(":")[1]
        );
        // end time to H:1 format
        data.append(
          "end_time",
          this.form[index].end_time.split(":")[0] +
            ":" +
            this.form[index].end_time.split(":")[1]
        );
        data.append("status", +this.form[index].status);

        // show request loading
        this.showRequsetLoading();

        this.axios
          .put(
            `dashboard/doctors/${this.$route.params.id}/time-management`,
            data,
            {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            }
          )
          .then((response) => {
            this.handleResponse(response);

            // hide request loading
            this.hideRequsetLoading();
          })
          .catch((error) => {
            this.handleResponse(error.response);

            // hide request loading
            this.hideRequsetLoading();
          });
      }
    },
  },
};
</script>
