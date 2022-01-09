<template>
  <header class="header-global">
    <div style="position: relative">
      <base-nav type="honeydew" effect="light" expand>
      <img src="../../public/img/icons/common/pangtudy_logo.jpg.png" width="40px" height="40px"/>
        <a class="navbar-brand fa-2x" @click="goTo()">Pangtudy</a>

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
            </li>
         
         <base-dropdown tag="li" title="settings">
          <a class="dropdown-item" v-for="(sub,i) in subList" :key="i" @click="goTo(sub.path)">
            {{sub.name}}
          </a>
         </base-dropdown>
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
      {name: 'Profile', path:'profile'},
      {name:'Calendar',path:'calendar'},
      {name:'Board',path:'board/list'}
    ],
    subList:[
      {name:'권한관리',path:'grant'},
      {name:'설정',path:'settings'},
    ]
    }
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
      if(path){
      this.$router.push('/'+path);
      }else{
        this.$router.push('/');
      }
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
