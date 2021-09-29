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
import { Store } from "vuex";

import SearchList from "./views/components/board/SearchList.vue";

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
      path: "/searchList",
      name: "searchList",
      components: {
        header: AppHeader,
        default: SearchList,
        footer: AppFooter
      }
    }
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