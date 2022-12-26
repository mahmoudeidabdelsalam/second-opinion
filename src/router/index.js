import Vue from "vue";
import VueRouter from "vue-router";

// auth routes
import authRoutes from "@/modules/auth/auth.routes";

// ClientSide routes
import clientSide from "@/modules/clientSide/clientSide.routes";

// dashboard routes
import dashboardRoutes from "@/modules/dashboard/dashboard.routes";

Vue.use(VueRouter);

const baseRoutes = [];
const routes = baseRoutes.concat(authRoutes, dashboardRoutes, clientSide);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
