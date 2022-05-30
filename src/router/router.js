import Vue from "vue";
import Router from "vue-router";
import beforeEach from "@/router/beforeEach.js";

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/Components.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/calendar",
      name: "calendar",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/conference/Calendar.vue"),
      },
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/Landing.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/Login.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/Register.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/Profile.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/success", // 로그인 완료
      name: "success",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/Success.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/pwinquiry",
      name: "pwinquiry",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/pwinquiry.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/delete",
      name: "delete",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/delete.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/practice",
      name: "practice",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/practice.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/board/list",
      name: "list",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/components/board/List"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/board/new",
      name: "new",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/components/board/New"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/board/view/:id",
      name: "view",
      props: true,
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/components/board/View"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/grant",
      name: "grant",
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/Grant.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
    {
      path: "/setting",
      name: Setting,
      components: {
        header: () => import("@/layout/AppHeader.vue"),
        default: () => import("@/views/Setting.vue"),
        footer: () => import("@/layout/AppFooter.vue"),
      },
    },
  ],
});

router.beforeEach(beforeEach);

export default router;
