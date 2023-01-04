// public routes
let routes = [
  // public
  {
    path: "/",
    name: "PublicLayout",
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
    ],
  },
];

export default routes;
