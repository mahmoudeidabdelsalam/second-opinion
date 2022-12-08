import Vue from "vue";
import VueRouter from "vue-router";

// auth routes
import authRoutes from "@/modules/auth/auth.routes";

Vue.use(VueRouter);

const baseRoutes = [];
const routes = baseRoutes.concat(authRoutes);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
