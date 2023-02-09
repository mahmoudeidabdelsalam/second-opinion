// public routes
let routes = [
  // public
  {
    path: "/",
    component: () => import("@/modules/public/layout/PublicLayout.vue"),
    children: [
      // home
      {
        path: "",
        name: "Home",
        component: () => import("@/modules/public/views/Home.vue"),
      },

      // about us
      {
        path: "about-us",
        name: "PublicAbout",
        component: () => import("@/modules/public/views/About.vue"),
      },

      // services
      {
        path: "services",
        name: "PublicServices",
        component: () => import("@/modules/public/views/Services.vue"),
      },

      // doctors
      {
        path: "doctors",
        name: "PublicDoctors",
        component: () => import("@/modules/public/views/Doctors.vue"),
      },

      // blog
      {
        path: "blog",
        name: "PublicBlog",
        component: () => import("@/modules/public/views/Blog.vue"),
      },

      // doctor profile
      {
        path: "doctor/:id",
        name: "PublicDoctorsProfile",
        component: () => import("@/modules/public/views/DoctorProfile.vue"),
      },

      // terms and conditions
      {
        path: "terms-and-conditions",
        name: "PublicTermsAndConditions",
        component: () =>
          import("@/modules/public/views/TermsAndConditions.vue"),
      },

      // 404 not found
      {
        path: "/:catchAll(.*)",
        name: "PublicNotFound",
        component: () => import("@/modules/public/views/NotFound.vue"),
      },
    ],
  },
];

export default routes;
