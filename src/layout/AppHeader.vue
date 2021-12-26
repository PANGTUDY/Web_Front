<template>
  <header class="header-global">
    <div style="position: relative">
      <base-nav type="honeydew" effect="light" expand>
      <img src="../../public/img/icons/common/pangtudy_logo.jpg.png" width="40px" height="40px"/>
        <a class="navbar-brand fa-2x">Pangtudy</a>

        <div class="row" slot="content-header" slot-scope="{ closeMenu }">
          <div class="col-6 collapse-brand">
            <img src="../../public/img/icons/common/pangtudy.jpg" />
          </div>
          <div class="col-6 collapse-close">
            <close-button @click="closeMenu"></close-button>
          </div>
        </div>

        <ul class="navbar-nav ml-lg-auto flex">
          <li class="nav-item" v-for="(menu,i) in menuList" :key="i">
            <a class="nav-link nav-link-icon" @click="goTo(menu.path)">{{menu.name}}</a>
<<<<<<< HEAD
          </li>  
=======
            </li>
>>>>>>> b81286c52ac2577b772ebbb1c00b0bfb53627b23
           <!-- <li class="nav-item">
            <img :src="person.src" class="rounded-circle" style="width:20px;height:20px;"></li>
          <li class="nav-item" v-if="!loggedIn"> 
            <a class="nav-link nav-link-icon"><router-link to="/login">Login</router-link></a>
          </li>
          <li class="nav-item" v-if="!loggedIn">
            <a class="nav-link nav-link-icon"><router-link to="/register">Register</router-link></a>
          </li>
          <li class="nav-item" v-else>
            <a class="nav-link nav-link-icon" @click="logout">Logout</a>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <a class="nav-link nav-link-icon"><router-link to="/profile">Profile</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon"><router-link to="/calendar">Calendar</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="#"><router-link to="/board/list">Board</router-link></a>
          </li>
          <base-dropdown tag="li" title="Settings">
          
            <a class="dropdown-item" href="#">권한관리</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </base-dropdown> -->
<<<<<<< HEAD
         
=======
         <base-dropdown tag="li" title="settings">
          <a class="dropdown-item" v-for="(sub,i) in subList" :key="i">
            {{sub.name}}
          </a>
         </base-dropdown>
>>>>>>> b81286c52ac2577b772ebbb1c00b0bfb53627b23
        </ul>
      </base-nav>
    </div>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import {authComputed} from "../user_store/helper.js";

export default {
  data(){
    return {
    person:{
      src:require('../../public/img/icons/common/happy.png')
    },
    menuList:[
      {name:'Login',path:'login'},
      {name:'Register',path:'register'},
<<<<<<< HEAD
      {name:'Profile',path:'profile'},
      {name:'Board',path:'board/list'}
    ]
  }
=======
      {name: 'Profile', path:'profile'},
      {name:'Calendar',path:'calendar'},
      {name:'Board',path:'board/list'}
    ],
    subList:[
      {name:'권한관리',path:'grant'},
      {name:'설정',path:'settings'},
    ]
    }
>>>>>>> b81286c52ac2577b772ebbb1c00b0bfb53627b23
  },
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
  computed:{
    ...authComputed
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
    },
    goTo(path){
<<<<<<< HEAD
      if(this.$route.path !== '/'){
         this.$router.push('/',+ path)
      }else{
        this.$router.push(path)
      }
      
=======
      this.$router.push('/'+path);

>>>>>>> b81286c52ac2577b772ebbb1c00b0bfb53627b23
    }
 
  }
};
</script>
<style scoped>
li{
  display:flex;
} 

/* 수정보완필요 */
</style>
