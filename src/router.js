import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Success from "./views/Success.vue";
import pwinquiry from "./views/pwinquiry.vue";
import Delete from "./views/delete.vue";
import practice from "./views/practice.vue";
import { Store } from "vuex";

import List from "./views/components/board/List";
import View from "./views/components/board/View";

Vue.use(Router);


const router = new Router({
  linkExactActiveClass: "active",
  mode:'history',
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
      meta:{
        requiresAuth: true
      }
    },
    {
      path: "/success", // 로그인 완료
      name:"success",
      components:{
        header:AppHeader,
        default:Success,
        footer:AppFooter,
      }
    },
    {
      path: "/board/list",
      name: "list",
      components: {
        header: AppHeader,
        default: List,
        footer: AppFooter
      }
    },
    {
      path:"/pwinquiry",
      name:"pwinquiry",
      components:{
        header:AppHeader,
        default:pwinquiry,
        footer:AppFooter,
      }
    },
    {
      path:"/delete",
      name:"delete",
      components:{
        header:AppHeader,
        default:Delete,
        footer:AppFooter,
      }
    },
    {
      path:"/practice",
      name:"practice",
      components:{
        header:AppHeader,
        default: practice,
        footer:AppFooter,
    }
  },
    {
      path: "/board/view/:id",
      name: "view",
      components: {
        header: AppHeader,
        default: View,
        footer: AppFooter
      },      
    },
  ],
});
router.beforeEach((to,from,next)=>{
  const loggedIn = localStorage.getItem('user')

  console.log(to);
  if(to.matched.some(record=>record.meta.requiresAuth)&&!loggedIn){
    next('/')
  }
  next()
});

export default router