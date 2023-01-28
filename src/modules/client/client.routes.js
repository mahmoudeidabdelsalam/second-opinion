// vuex store
import store from "@/store";

// public routes
let routes = [
  // public
  {
    path: "/account",
    name: "AccountLayout",
    component: () => import("@/modules/client/layout/AccountLayout.vue"),
    beforeEnter: (to, from, next) => {
      // if user is authenticated and role has permission to access account
      store.getters["user/authenticated"] &&
      store.getters["user/userData"].role.value == 4
        ? next()
        : next({ name: "Login" });
    },
    children: [
      // notifications
      {
        path: "notifications",
        name: "ClientNotifications",
        component: () => import("@/modules/client/views/Notifications.vue"),
      },

      // appointments
      {
        path: "appointments",
        name: "ClientAppointments",
        component: () => import("@/modules/client/views/Appointments.vue"),
      },

      // medical reports
      {
        path: "medical-reports",
        name: "ClientMedicalReports",
        component: () => import("@/modules/client/views/MedicalReports.vue"),
      },

      // medical reports details
      {
        path: "medical-reports-profile/:id",
        name: "ClientMedicalReportsProfile",
        component: () => import("@/modules/client/views/ReportProfile.vue"),
      },

      // payment
      {
        path: "payment-methods",
        name: "ClientPaymentMethods",
        component: () => import("@/modules/client/views/PaymentMethods.vue"),
      },

      // settings
      {
        path: "settings",
        name: "ClientSettings",
        component: () => import("@/modules/client/views/Settings.vue"),
      },

      // help
      {
        path: "help",
        name: "ClientHelp",
        component: () => import("@/modules/client/views/Help.vue"),
      },

      // about
      {
        path: "about",
        name: "ClientAboutSite",
        component: () => import("@/modules/client/views/AboutSite.vue"),
      },
    ],
  },
];

export default routes;
